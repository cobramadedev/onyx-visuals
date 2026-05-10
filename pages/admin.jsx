import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["Thumbnails", "Logos", "Banners", "Product Boxes", "Product Cards"];

export default function AdminPage() {
  const [session, setSession]       = useState(null);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [authError, setAuthError]   = useState("");
  const [items, setItems]           = useState([]);
  const [search, setSearch]         = useState("");
  const [uploading, setUploading]   = useState(false);
  const [uploadName, setUploadName] = useState("");
  const [uploadCat, setUploadCat]   = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editItem, setEditItem]     = useState(null);
  const [logoUrl, setLogoUrl]       = useState("");
  const [view, setView]             = useState("portfolio");
  const [toast, setToast]           = useState({ msg: "", type: "" });
  const fileInputRef                = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSession(data.session);
    });
    // Keep session in sync
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) { fetchItems(); fetchLogo(); }
  }, [session]);

  const fetchItems = async () => {
    const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  const fetchLogo = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "logo_url").single();
    if (data?.value) setLogoUrl(data.value);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };

  const handleLogin = async () => {
    setAuthError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAuthError("Incorrect email or password."); return; }
    setSession(data.session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setUploadFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!uploadName || !uploadCat || !uploadFile) {
      showToast("Fill in all fields and select an image.", "error"); return;
    }
    setUploading(true);

    try {
      // Upload image to storage
      const ext  = uploadFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("portfolio-images")
        .upload(path, uploadFile);

      if (upErr) {
        showToast("Upload failed: " + upErr.message, "error");
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(path);

      // Insert row — session is handled automatically by the client
      const { error: insertError } = await supabase
        .from("portfolio")
        .insert({
          title: uploadName,
          category: uploadCat,
          image_url: urlData.publicUrl,
        });

      if (insertError) {
        showToast("Save failed: " + insertError.message, "error");
        setUploading(false);
        return;
      }

      showToast("Item uploaded successfully.");
      setUploadName(""); setUploadCat(""); setUploadFile(null); setPreviewUrl("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchItems();
    } catch (err) {
      showToast("Unexpected error: " + err.message, "error");
    }

    setUploading(false);
  };

  const handleSaveEdit = async () => {
    if (!editItem?.title) { showToast("Name cannot be empty.", "error"); return; }
    const { error } = await supabase.from("portfolio")
      .update({ title: editItem.title, category: editItem.category })
      .eq("id", editItem.id);
    if (error) { showToast("Update failed: " + error.message, "error"); return; }
    showToast("Item updated.");
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); return; }
    showToast("Item deleted.");
    fetchItems();
  };

  const handleSaveLogo = async () => {
    const { error } = await supabase.from("site_settings")
      .upsert({ key: "logo_url", value: logoUrl }, { onConflict: "key" });
    if (error) { showToast("Failed: " + error.message, "error"); return; }
    showToast("Logo saved.");
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const s = {
    page:       { minHeight:"100vh", background:"#0a0a0a", fontFamily:"'Satoshi','Inter',system-ui,sans-serif", color:"#fff", display:"flex" },
    center:     { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", background:"#0a0a0a", fontFamily:"'Satoshi','Inter',system-ui,sans-serif" },
    card:       { width:"100%", maxWidth:400, background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"2.5rem 2rem", display:"flex", flexDirection:"column", gap:"1.5rem", color:"#fff" },
    logoTxt:    { fontSize:13, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", textAlign:"center", color:"#fff" },
    input:      { background:"#1a1a1a", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"10px 14px", fontSize:14, color:"#fff", fontFamily:"inherit", outline:"none", width:"100%" },
    label:      { fontSize:12, color:"#888", fontWeight:500, display:"block", marginBottom:6 },
    btnPrimary: { padding:"11px", borderRadius:30, fontSize:13, fontWeight:700, fontFamily:"inherit", border:"none", background:"linear-gradient(180deg,#fff 0%,#e8e8e8 50%,#d4d4d4 100%)", color:"#111", cursor:"pointer", width:"100%" },
    sidebar:    { width:220, background:"#111", borderRight:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", padding:"1.75rem 1.25rem", gap:"0.5rem", flexShrink:0 },
    sideLogoTxt:{ fontSize:12, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"#fff", padding:"0 0.5rem 1.25rem", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:"0.5rem" },
    navBtn:     (active) => ({ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:8, fontSize:13, color: active ? "#fff" : "#555", cursor:"pointer", transition:"all 0.15s", border:"none", background: active ? "rgba(255,255,255,0.07)" : "none", fontFamily:"inherit", width:"100%", textAlign:"left" }),
    main:       { flex:1, padding:"2.5rem", overflow:"auto" },
    panel:      { background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"1.75rem", marginBottom:"1.5rem" },
    panelTitle: { fontSize:11, fontWeight:600, color:"#aaa", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1.25rem" },
    formRow:    { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, alignItems:"end" },
    select:     { background:"#1a1a1a", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#fff", fontFamily:"inherit", outline:"none", width:"100%", appearance:"none" },
    uploadBtn:  { padding:"10px 22px", borderRadius:30, fontSize:13, fontWeight:700, fontFamily:"inherit", cursor:"pointer", border:"none", background:"linear-gradient(180deg,#fff 0%,#e0e0e0 100%)", color:"#111", whiteSpace:"nowrap", transition:"opacity 0.2s" },
    dropZone:   { border:"1.5px dashed rgba(255,255,255,0.12)", borderRadius:10, padding:"1.5rem", textAlign:"center", cursor:"pointer", marginBottom:16, display:"flex", flexDirection:"column", alignItems:"center", gap:8 },
    table:      { width:"100%", borderCollapse:"collapse" },
    th:         { padding:"10px 1rem", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#555", textAlign:"left", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.02)" },
    td:         { padding:"12px 1rem", fontSize:13, color:"#ccc", borderBottom:"1px solid rgba(255,255,255,0.05)", verticalAlign:"middle" },
    thumb:      { width:44, height:44, borderRadius:6, objectFit:"cover", border:"1px solid rgba(255,255,255,0.07)" },
    catTag:     { display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:500, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.07)", color:"#aaa" },
    iconBtn:    (danger) => ({ width:30, height:30, borderRadius:7, border:"1px solid rgba(255,255,255,0.08)", background:"#1a1a1a", color: danger ? "#f87171" : "#aaa", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }),
    modal:      { position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" },
    modalBox:   { background:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"2rem", width:"100%", maxWidth:460, display:"flex", flexDirection:"column", gap:"1.25rem" },
    toast:      (type) => ({ position:"fixed", bottom:"2rem", right:"2rem", background:"#111", border:`1px solid ${type==="success" ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius:10, padding:"12px 18px", fontSize:13, color:"#fff", display:"flex", alignItems:"center", gap:8, zIndex:300, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }),
  };

  // ── LOGIN ──
  if (!session) return (
    <div style={s.center}>
      <div style={s.card}>
        <div style={s.logoTxt}>Onyx <span style={{color:"#555"}}>Admin</span></div>
        <div>
          <h1 style={{fontSize:"1.4rem",fontWeight:700,letterSpacing:"-0.02em",textAlign:"center"}}>Admin Login</h1>
          <p style={{fontSize:13,color:"#555",textAlign:"center",marginTop:6}}>Sign in to manage your portfolio.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <div><label style={s.label}>Email</label><input style={s.input} type="email" placeholder="admin@onyxvisuals.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><label style={s.label}>Password</label><input style={s.input} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} /></div>
          {authError && <p style={{fontSize:12,color:"#f87171"}}>{authError}</p>}
          <button style={s.btnPrimary} onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  return (
    <div style={s.page}>

      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sideLogoTxt}>Onyx <span style={{color:"#444"}}>Admin</span></div>
        <button style={s.navBtn(view==="portfolio")} onClick={()=>setView("portfolio")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Portfolio
        </button>
        <button style={s.navBtn(view==="settings")} onClick={()=>setView("settings")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
          Site Settings
        </button>
        <div style={{marginTop:"auto",borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:"1rem"}}>
          <button style={s.navBtn(false)} onClick={handleLogout}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"2rem"}}>
          <h1 style={{fontSize:"1.3rem",fontWeight:700,letterSpacing:"-0.02em"}}>{view==="portfolio" ? "Portfolio" : "Site Settings"}</h1>
          <span style={{fontSize:12,color:"#444"}}>{session.user?.email}</span>
        </div>

        {view === "portfolio" && <>
          {/* Upload */}
          <div style={s.panel}>
            <p style={s.panelTitle}>Upload New Item</p>
            <div style={s.dropZone} onClick={()=>fileInputRef.current?.click()}
              onDragOver={e=>e.preventDefault()}
              onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleFileChange(f);}}>
              <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFileChange(e.target.files[0])} />
              {previewUrl
                ? <img src={previewUrl} alt="preview" style={{maxHeight:80,maxWidth:160,objectFit:"contain",borderRadius:8}} />
                : <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p style={{fontSize:13,color:"#555"}}>Drag & drop or click to upload</p>
                    <p style={{fontSize:11,color:"#333"}}>PNG, JPG, WEBP up to 10MB</p>
                  </>
              }
            </div>
            <div style={s.formRow}>
              <div>
                <label style={s.label}>Server / Client Name</label>
                <input style={s.input} type="text" placeholder="e.g. NightCore SMP" value={uploadName} onChange={e=>setUploadName(e.target.value)} />
              </div>
              <div>
                <label style={s.label}>Category</label>
                <select style={s.select} value={uploadCat} onChange={e=>setUploadCat(e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}>
              <button style={{...s.uploadBtn,opacity:uploading?0.6:1}} onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{background:"#111",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.25rem 1.75rem",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
              <p style={{...s.panelTitle,margin:0}}>All Items</p>
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"7px 12px"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}
                  style={{background:"none",border:"none",outline:"none",fontSize:13,color:"#fff",fontFamily:"inherit",width:180}} />
              </div>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{...s.th,width:60}}>Image</th>
                  <th style={s.th}>Client Name</th>
                  <th style={s.th}>Category</th>
                  <th style={s.th}>Uploaded</th>
                  <th style={{...s.th,width:90}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={5} style={{...s.td,textAlign:"center",padding:"3rem",color:"#333"}}>No items found.</td></tr>
                  : filtered.map(item => (
                    <tr key={item.id}>
                      <td style={s.td}><img style={s.thumb} src={item.image_url} alt={item.title} /></td>
                      <td style={{...s.td,fontWeight:500,color:"#fff"}}>{item.title}</td>
                      <td style={s.td}><span style={s.catTag}>{item.category}</span></td>
                      <td style={s.td}>{item.created_at?.split("T")[0]}</td>
                      <td style={s.td}>
                        <div style={{display:"flex",gap:6}}>
                          <button style={s.iconBtn(false)} onClick={()=>setEditItem({...item})} title="Edit">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
                          </button>
                          <button style={s.iconBtn(true)} onClick={()=>handleDelete(item.id)} title="Delete">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </>}

        {view === "settings" && (
          <div style={s.panel}>
            <p style={s.panelTitle}>Site Branding</p>
            <div>
              <label style={s.label}>Logo Image URL</label>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <input style={{...s.input,flex:1}} type="url" placeholder="https://example.com/logo.png" value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} />
                <button style={s.uploadBtn} onClick={handleSaveLogo}>Save</button>
              </div>
              <p style={{fontSize:11,color:"#444",marginTop:6}}>Paste a direct image link. Shown in the navbar.</p>
            </div>
            {logoUrl && (
              <div style={{marginTop:"1.25rem"}}>
                <label style={s.label}>Preview</label>
                <div style={{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"1.25rem",display:"flex",alignItems:"center",minHeight:64}}>
                  <img src={logoUrl} alt="Logo preview" style={{maxHeight:40,maxWidth:160,objectFit:"contain"}} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit modal */}
      {editItem && (
        <div style={s.modal} onClick={e=>{if(e.target===e.currentTarget)setEditItem(null);}}>
          <div style={s.modalBox}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <h2 style={{fontSize:15,fontWeight:700}}>Edit Item</h2>
              <button onClick={()=>setEditItem(null)} style={{...s.iconBtn(false)}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div><label style={s.label}>Server / Client Name</label><input style={s.input} type="text" value={editItem.title} onChange={e=>setEditItem({...editItem,title:e.target.value})} /></div>
            <div>
              <label style={s.label}>Category</label>
              <select style={s.select} value={editItem.category} onChange={e=>setEditItem({...editItem,category:e.target.value})}>
                {CATEGORIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",paddingTop:"0.5rem",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
              <button onClick={()=>setEditItem(null)} style={{padding:"9px 18px",borderRadius:30,fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer",border:"1px solid rgba(255,255,255,0.08)",background:"none",color:"#aaa"}}>Cancel</button>
              <button onClick={handleSaveEdit} style={{...s.uploadBtn,padding:"9px 22px"}}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.msg && (
        <div style={s.toast(toast.type)}>
          {toast.type === "success"
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
          {toast.msg}
        </div>
      )}
    </div>
  );
}