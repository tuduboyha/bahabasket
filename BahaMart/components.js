/* ═══════════════════════════════════════════════════════════
   BAHABASKET — SHARED COMPONENTS
   ───────────────────────────────────────────────────────────
   Kaise use karein:
     1. Jis page mein header chahiye:  <div id="site-header"></div>
     2. Jis page mein footer chahiye:  <div id="site-footer"></div>
     3. </body> se pehle add karein:   <script src="components.js"></script>

   Changes yahaan karo — sabhi pages pe automatically reflect honge.
═══════════════════════════════════════════════════════════ */

(function () {

  /* ─────────────────────────────────────────────────────────
     1. SHARED CSS
     (topbar · navbar · hamburger · footer · float-WA)
  ───────────────────────────────────────────────────────── */
  const SHARED_CSS = `
/* ── TOP BAR ── */
.topbar{background:var(--primary-dark);color:#fff;font-size:12px;padding:6px 20px;display:flex;justify-content:space-between;align-items:center;gap:10px;}
.topbar-left{display:flex;align-items:center;gap:16px;}
.topbar-right{display:flex;align-items:center;gap:16px;}
.topbar a{color:#c7d9ff;transition:color .2s;}
.topbar a:hover{color:#fff;}
.topbar .pill{background:var(--accent);color:#fff;padding:2px 10px;border-radius:20px;font-weight:600;font-size:11px;animation:pulse-accent 2s infinite;}
@keyframes pulse-accent{0%,100%{opacity:1;}50%{opacity:.8;}}

/* ── HEADER WRAPPER (topbar + navbar dono sticky) ── */
#site-header{position:sticky;top:0;z-index:300;display:flex;flex-direction:column;gap:0;background:var(--primary-dark);}

/* ── NAVBAR ── */
.navbar{background:var(--white);border-bottom:2px solid var(--border);padding:12px 24px 10px;display:flex !important;flex-direction:column !important;gap:10px;height:auto !important;min-height:unset !important;position:relative !important;top:auto !important;box-shadow:0 2px 16px rgba(0,0,0,.06);isolation:isolate;margin-top:0 !important;}
.navbar-row{display:flex;align-items:center;gap:14px;width:100%;}
.logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none;}
.logo-img{height:48px;width:auto;display:block;object-fit:contain;}
.nav-search-wrap{flex:1;position:relative;}
.nav-search{width:100%;height:44px;display:flex;align-items:center;background:var(--bg);border:2px solid var(--border);border-radius:50px;overflow:hidden;transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.06);position:relative;}
.nav-search:focus-within{border-color:var(--primary);box-shadow:0 0 0 4px rgba(26,86,219,.1),0 4px 16px rgba(26,86,219,.12);background:var(--white);}
.nav-search-icon{padding:0 8px 0 14px;color:var(--text-light);flex-shrink:0;display:flex;align-items:center;transition:color .2s;}
.nav-search:focus-within .nav-search-icon{color:var(--primary);}
.nav-search input{flex:1;border:none;outline:none;background:transparent;padding:0 8px;font-size:14px;color:var(--text-dark);font-family:'Noto Sans',sans-serif;height:42px;min-width:0;}
.nav-search input::placeholder{color:var(--text-light);font-size:13.5px;}
.nav-search-btn{background:linear-gradient(135deg,var(--primary),var(--primary-dark));border:none;color:#fff;width:36px;height:36px;border-radius:50%;margin-right:4px;transition:all .22s;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}
.nav-search-btn:hover{background:linear-gradient(135deg,var(--primary-dark),#0a2d7a);box-shadow:0 4px 12px rgba(26,86,219,.35);transform:scale(1.07);}
.nav-links{display:flex;align-items:center;gap:12px;margin-left:auto;}
.nav-links a{padding:8px 14px;border-radius:8px;font-size:13.5px;font-weight:500;color:var(--text-mid);transition:background .2s,color .2s;white-space:nowrap;}
.nav-links a:hover,.nav-links a.active{background:var(--primary-light);color:var(--primary);}
.nav-link-login{display:flex !important;align-items:center;justify-content:center;gap:7px;height:40px;padding:0 16px !important;border-radius:8px;font-size:13.5px !important;font-weight:600 !important;color:#fff !important;background:linear-gradient(135deg,var(--primary),var(--primary-dark)) !important;border:none !important;box-shadow:0 2px 10px rgba(26,86,219,.25);transition:all .22s !important;white-space:nowrap;box-sizing:border-box;text-decoration:none;}
.nav-link-login:hover{background:linear-gradient(135deg,var(--primary-dark),#0a2d7a) !important;box-shadow:0 4px 16px rgba(26,86,219,.4) !important;transform:translateY(-1px);}
.nav-btn-register{display:flex !important;align-items:center;justify-content:center;gap:7px;height:40px;padding:0 16px !important;background:linear-gradient(135deg,var(--accent),#ea580c);color:#fff !important;border-radius:8px;font-weight:600 !important;font-size:13.5px !important;transition:all .22s !important;box-shadow:0 2px 10px rgba(249,115,22,.25);white-space:nowrap;box-sizing:border-box;text-decoration:none;}
.nav-btn-register:hover{background:linear-gradient(135deg,#ea580c,#c2410c) !important;box-shadow:0 4px 16px rgba(249,115,22,.4) !important;transform:translateY(-1px);}

/* ── HAMBURGER ── */
.hamburger-btn{display:none;flex-shrink:0;width:40px;height:40px;background:var(--bg);border:2px solid var(--border);border-radius:10px;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;flex-direction:column;gap:5px;padding:0;}
.hamburger-btn:hover{border-color:var(--primary);background:var(--primary-light);}
.hamburger-btn span{display:block;width:18px;height:2px;background:var(--text-dark);border-radius:2px;transition:all .25s;}
.hamburger-btn.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.hamburger-btn.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger-btn.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.nav-hamburger-wrap{display:flex;align-items:center;gap:8px;position:relative;}

/* ── SIDE DRAWER ── */
.side-drawer-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:10000;backdrop-filter:blur(2px);}
.side-drawer-overlay.open{display:block;}
.side-drawer{position:fixed;top:0;right:-320px;width:300px;max-width:85vw;height:100%;background:#fff;z-index:10001;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.18);transition:right .3s cubic-bezier(.4,0,.2,1);overflow:hidden;}
.side-drawer.open{right:0;}

/* Drawer header */
.drawer-header{background:linear-gradient(135deg,var(--primary),var(--primary-dark));padding:20px 18px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.drawer-logo{display:flex;align-items:center;flex:1;}
.drawer-logo-img{height:38px;width:auto;display:block;object-fit:contain;filter:brightness(0) invert(1);}
.drawer-close{width:34px;height:34px;background:rgba(255,255,255,.15);border:none;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s;flex-shrink:0;line-height:0;}
.drawer-close:hover{background:rgba(255,255,255,.28);}

/* Drawer body */
.drawer-body{flex:1;overflow-y:auto;padding:16px 12px;}
.drawer-section{margin-bottom:8px;}
.drawer-section-title{font-size:10.5px;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:.6px;padding:0 8px;margin-bottom:6px;}
.drawer-link{display:flex;align-items:center;gap:12px;padding:12px 10px;border-radius:11px;font-size:14px;font-weight:600;color:var(--text-dark);text-decoration:none;transition:background .18s,color .18s;cursor:pointer;border:none;background:transparent;width:100%;text-align:left;}
.drawer-link:hover,.drawer-link.active{background:var(--primary-light);color:var(--primary);}
.drawer-link-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;}
.drawer-divider{height:1px;background:var(--border);margin:10px 8px;}

/* Drawer footer */
.drawer-footer{padding:14px 12px 24px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:10px;flex-shrink:0;}
.drawer-btn-login{display:flex;align-items:center;justify-content:center;gap:8px;height:44px;border-radius:10px;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border:none;text-decoration:none;box-shadow:0 2px 10px rgba(26,86,219,.25);transition:all .22s;}
.drawer-btn-login:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(26,86,219,.4);}
.drawer-btn-register{display:flex;align-items:center;justify-content:center;gap:8px;height:44px;border-radius:10px;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--accent),#ea580c);border:none;text-decoration:none;box-shadow:0 2px 10px rgba(249,115,22,.25);transition:all .22s;}
.drawer-btn-register:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(249,115,22,.4);}

@keyframes menuSlide{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}

/* ── FOOTER ── */
.footer{background:#0f172a;color:rgba(255,255,255,.75);padding:56px 24px 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;max-width:1280px;margin-left:auto;margin-right:auto;}
.footer-brand h3{font-family:'Baloo 2',cursive;font-size:22px;color:#fff;margin-bottom:10px;}
.footer-brand p{font-size:14px;line-height:1.7;margin-bottom:20px;}
.footer-social{display:flex;gap:10px;}
.social-btn{width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;transition:background .2s;cursor:pointer;}
.social-btn:hover{background:var(--primary);}
.social-btn.fb:hover{background:#1877f2;}
.social-btn.ig:hover{background:#e1306c;}
.social-btn.x-btn:hover{background:#000;}
.social-btn.wa:hover{background:var(--whatsapp);}
.footer-col h4{font-family:'Baloo 2',cursive;font-size:16px;color:#fff;margin-bottom:16px;}
.footer-links{list-style:none;}
.footer-links li{margin-bottom:10px;}
.footer-links a{font-size:13.5px;color:rgba(255,255,255,.6);transition:color .2s;}
.footer-links a:hover{color:#fff;}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;font-size:13px;color:rgba(255,255,255,.4);max-width:1280px;margin:0 auto;gap:12px;}
.footer-bottom a{color:var(--primary);}

/* ── FLOATING WHATSAPP ── */
.float-wa{position:fixed;bottom:28px;right:28px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.float-wa-btn{width:58px;height:58px;background:var(--whatsapp);border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:0;box-shadow:0 4px 20px rgba(37,211,102,.4);cursor:pointer;animation:float-bounce 3s infinite;transition:transform .2s;}
.float-wa-btn:hover{transform:scale(1.1);}
@keyframes float-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.float-wa-tooltip{background:#fff;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;color:var(--text-dark);box-shadow:0 4px 20px rgba(0,0,0,.12);white-space:nowrap;border:1px solid var(--border);}

/* ── CATEGORY BAR ── */
#catBarWrapper{display:none;background:var(--white);border-bottom:1px solid var(--border);align-items:center;height:48px;}
.cat-bar{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:0 4px;}
.cat-bar::-webkit-scrollbar{display:none;}
.cat-pill{display:flex;align-items:center;gap:6px;padding:10px 16px;border-radius:0;font-size:13px;font-weight:500;color:var(--text-mid);white-space:nowrap;cursor:pointer;border-bottom:3px solid transparent;transition:color .2s,border-color .2s;user-select:none;}
.cat-pill:hover,.cat-pill.active{color:var(--primary);border-bottom-color:var(--primary);}
.cat-pill .emoji{display:flex;align-items:center;justify-content:center;font-size:16px;}
.cat-svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}
.cat-pill .cat-svg{width:18px;height:18px;stroke-width:2.2;}
#catBarLeft[disabled],#catBarRight[disabled]{opacity:.35;pointer-events:none;cursor:default;}

/* ── RESPONSIVE ── */
@media(max-width:1100px){
  .nav-shop-via-wrap #shopViaDropdown{left:auto;right:0;}
}
@media(max-width:900px){
  .navbar{padding:10px 16px 8px;}
  .logo-img{height:40px;}
  .topbar{font-size:11px;}
  .footer-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:640px){
  .navbar{padding:8px 12px;}
  .logo-img{height:34px;}
  .nav-links{display:none !important;}
  .hamburger-btn{display:flex;}
  /* Row 1: Logo | [auto space] | Hamburger (right) */
  .navbar-row:first-child{flex-wrap:nowrap;}
  .nav-hamburger-wrap{margin-left:auto;}
  /* Row 2: Search bar (flex:1) | Location pill (right side) */
  .navbar-row:last-child{gap:8px;flex-wrap:nowrap;}
  .navbar-row:last-child .nav-search-wrap{flex:1;order:1;}
  .nav-search{height:46px !important;}
  .nav-search-btn{width:38px !important;height:38px !important;}
  #navLocBtn{order:2;flex-shrink:0;height:46px !important;padding:0 12px !important;}
  #navLocName{max-width:55px !important;font-size:12px !important;}
  #navShopViaBtn{height:40px !important;padding:0 10px !important;}
}
@media(max-width:600px){
  .footer-grid{grid-template-columns:1fr;}
  .float-wa{bottom:16px;right:16px;}
}
`;

  /* ─────────────────────────────────────────────────────────
     2. HEADER HTML
     (Topbar + Navbar)

     ✏️  Yahaan changes karo — sabhi pages pe reflect hoga
  ───────────────────────────────────────────────────────── */
  const HEADER_HTML = `
<!-- TOP BAR -->
<div class="topbar">
  <div class="topbar-left">
    <span>📍 Your City's Online Marketplace</span>
    <span class="pill">🔥 NEW: WhatsApp Shopping</span>
  </div>
  <div class="topbar-right"></div>
</div>

<!-- NAVBAR -->
<nav class="navbar" id="mainNavbar">

  <!-- ── ROW 1 : Logo · Shop Via · Login · Register · Hamburger ── -->
  <div class="navbar-row">
    <a href="local-bazaar-hub.html" class="logo">
      <img src="bahabasket-logo.png" alt="BahaBasket" class="logo-img">
    </a>

    <!-- Desktop nav links (Shop Via pill grouped here so it stays left of Login) -->
    <div class="nav-links">
      <div class="nav-shop-via-wrap" style="position:relative;flex-shrink:0;">
        <button id="navShopViaBtn"
          onclick="typeof openShopViaMenu==='function' && openShopViaMenu()"
          style="display:flex;align-items:center;gap:7px;flex-shrink:0;height:40px;padding:0 14px;background:var(--bg);border:2px solid var(--border);border-radius:50px;cursor:pointer;transition:all .25s;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.06);"
          onmouseover="this.style.borderColor='#25d366';this.style.boxShadow='0 0 0 4px rgba(37,211,102,.12),0 4px 16px rgba(37,211,102,.18)';this.style.background='var(--white)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='0 2px 8px rgba(0,0,0,.06)';this.style.background='var(--bg)'">
          <span id="shopViaIcon" style="display:flex;align-items:center;line-height:0;flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="#25d366" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>
          </span>
          <span style="font-size:12.5px;font-weight:500;color:var(--text-light);">Shop Via :</span>
          <span id="shopViaLabel" style="font-size:13px;font-weight:700;color:#128C7E;">WhatsApp</span>
          <svg id="shopViaChevron" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" style="flex-shrink:0;transition:transform .2s;"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <!-- Dropdown -->
        <div id="shopViaDropdown" style="display:none;position:absolute;top:calc(100% + 8px);right:0;min-width:230px;background:#fff;border:1.5px solid var(--border);border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,.15);z-index:999;padding:8px;flex-direction:column;gap:4px;animation:menuSlide .2s ease;">
          <div style="padding:8px 14px 6px;font-size:11px;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:.5px;">Choose Shopping Method</div>
          <button id="shopViaOptWA" onclick="selectShopVia('wa',event)"
            style="display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:10px;border:none;background:transparent;width:100%;cursor:pointer;text-align:left;transition:background .18s;"
            onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='transparent'">
            <span style="width:34px;height:34px;background:#25d366;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;">
              <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>
            </span>
            <div style="flex:1;text-align:left;">
              <div style="font-size:13.5px;font-weight:700;color:var(--text-dark);white-space:nowrap;">WhatsApp Shopping</div>
              <div style="font-size:12px;color:var(--text-light);font-weight:400;margin-top:2px;">Buy directly from seller</div>
            </div>
            <span id="shopViaCheckWA" style="display:flex;line-height:0;color:#25d366;flex-shrink:0;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </button>
        </div>
      </div>
      <a href="login-register.html" class="nav-link-login" id="navLoginBtn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Login
      </a>
      <a href="login-register.html?mode=seller" class="nav-btn-register" id="navRegisterBtn" style="box-sizing:border-box;border:none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Register Shop
      </a>
    </div>

    <!-- Mobile: Hamburger -->
    <div class="nav-hamburger-wrap">
      <button class="hamburger-btn" id="hamburgerBtn" onclick="toggleMobileMenu()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- ── ROW 2 : Search Bar · Location Pill ── -->
  <div class="navbar-row">
    <div class="nav-search-wrap">
      <div class="nav-search">
        <span class="nav-search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input type="text" id="navSearchInput" placeholder="Search products, shops, brands..."
          onkeydown="if(event.key==='Enter') typeof doSearch==='function' && doSearch()">
        <button class="nav-search-btn" onclick="typeof doSearch==='function' && doSearch()" title="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
      <!-- Search dropdown -->
      <div id="searchDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1.5px solid var(--border);border-top:none;border-radius:0 0 16px 16px;box-shadow:0 16px 40px rgba(0,0,0,.12);z-index:999;max-height:420px;overflow-y:auto;">
        <div id="searchDropdownInner" style="padding:8px 0;"></div>
      </div>
    </div>

    <!-- Location pill -->
    <button id="navLocBtn"
      onclick="typeof openPincodeModal==='function' && openPincodeModal()"
      style="display:flex;align-items:center;gap:7px;flex-shrink:0;height:44px;padding:0 16px;background:var(--bg);border:2px solid var(--border);border-radius:50px;cursor:pointer;transition:all .25s;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.06);"
      onmouseover="this.style.borderColor='var(--primary)';this.style.boxShadow='0 0 0 4px rgba(26,86,219,.1),0 4px 16px rgba(26,86,219,.12)';this.style.background='var(--white)'"
      onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='0 2px 8px rgba(0,0,0,.06)';this.style.background='var(--bg)'">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a56db" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
      <span id="navLocName" style="font-size:13.5px;font-weight:600;color:var(--text-dark);max-width:80px;overflow:hidden;text-overflow:ellipsis;">Indore</span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>

</nav>

<!-- SIDE DRAWER OVERLAY -->
<div class="side-drawer-overlay" id="sideDrawerOverlay" onclick="toggleMobileMenu()"></div>

<!-- SIDE DRAWER -->
<div class="side-drawer" id="sideDrawer">
  <!-- Header -->
  <div class="drawer-header">
    <div class="drawer-logo">
      <img src="bahabasket-logo.png" alt="BahaBasket" class="drawer-logo-img">
    </div>
    <button class="drawer-close" onclick="toggleMobileMenu()" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <!-- Login / Register buttons — top of drawer -->
  <div style="padding:14px 12px 10px;display:flex;flex-direction:column;gap:10px;border-bottom:1px solid var(--border);flex-shrink:0;">
    <a href="login-register.html" class="drawer-btn-login" id="drawerLoginBtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Login
    </a>
    <a href="login-register.html?mode=seller" class="drawer-btn-register" id="drawerRegisterBtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Register Shop
    </a>
  </div>

  <!-- Body -->
  <div class="drawer-body">

    <!-- Shop Via -->
    <div class="drawer-section">
      <div class="drawer-section-title">Shop Via</div>
      <a href="https://wa.me/919876543210?text=Hello! I want to shop from BahaBasket." target="_blank" class="drawer-link">
        <span class="drawer-link-icon" style="background:#dcfce7;">
          <svg viewBox="0 0 24 24" fill="#25d366" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>
        </span>
        <div>
          <div style="font-size:13.5px;font-weight:700;">WhatsApp Shopping</div>
          <div style="font-size:12px;color:var(--text-light);font-weight:400;margin-top:1px;">Buy directly from seller</div>
        </div>
      </a>
      <button class="drawer-link" onclick="toggleMobileMenu();openLiveChatPopup();">
        <span class="drawer-link-icon" style="background:var(--primary-light);">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </span>
        <div>
          <div style="font-size:13.5px;font-weight:700;">Live Chat</div>
          <div style="font-size:12px;color:var(--text-light);font-weight:400;margin-top:1px;">Buy without sharing your number</div>
        </div>
      </button>
    </div>

    <div class="drawer-divider"></div>

    <!-- Browse -->
    <div class="drawer-section">
      <div class="drawer-section-title">Browse</div>
      <a href="local-bazaar-hub.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#eff6ff;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </span>
        Home
      </a>
      <a href="shop-directory.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#faf5ff;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/><path d="M9 21V9h6v12"/></svg>
        </span>
        Shop Directory
      </a>
      <a href="product-listings.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#fff7ed;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </span>
        All Products
      </a>
      <a href="offers.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#fff1f2;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
        </span>
        Today's Offers
      </a>
    </div>

    <div class="drawer-divider"></div>

    <!-- For Sellers -->
    <div class="drawer-section">
      <div class="drawer-section-title">For Sellers</div>
      <a href="shopkeeper-registration.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#f0fdf4;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </span>
        Register Your Shop
      </a>
      <a href="seller-dashboard.html" class="drawer-link">
        <span class="drawer-link-icon" style="background:#eff6ff;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </span>
        Seller Dashboard
      </a>
    </div>

  </div>

</div>

<!-- CATEGORY BAR (default hidden — show karne ke liye: document.getElementById('catBarWrapper').style.display='flex') -->
<div id="catBarWrapper">
  <button id="catBarLeft" onclick="scrollBar(-1)" aria-label="Scroll left"
    style="flex-shrink:0;width:34px;height:34px;margin:0 4px 0 8px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;z-index:20;box-shadow:0 2px 10px rgba(0,0,0,.10);"
    onmouseover="if(!this.disabled){this.style.background='#1a56db';this.style.borderColor='#1a56db';this.style.boxShadow='0 4px 16px rgba(26,86,219,.35)';this.querySelector('polyline').style.stroke='#fff';}"
    onmouseout="if(!this.disabled){this.style.background='#fff';this.style.borderColor='#e2e8f0';this.style.boxShadow='0 2px 10px rgba(0,0,0,.10)';this.querySelector('polyline').style.stroke='#1a56db';}">
    <svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:#1a56db;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;pointer-events:none;"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <div id="catBarStrip" class="cat-bar" style="flex:1;height:100%;overflow-x:auto;scrollbar-width:none;scroll-behavior:smooth;border-bottom:none;padding:0 4px;align-items:center;" onscroll="updateBarArrows()">
    <div class="cat-pill active" data-cat="All" data-slug="" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M4 4h6v6h-6zm10 0h6v6h-6zm0 10h6v6h-6zm-10 0h6v6h-6z"/></svg></span> All</div>
    <div class="cat-pill" data-cat="Men Fashion" data-slug="men-fashion" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0"/></svg></span> Men Fashion</div>
    <div class="cat-pill" data-cat="Women Fashion" data-slug="women-fashion" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M10 16v5"/><path d="M14 16v5"/><path d="M8 16h8l-2 -7h-4z"/><circle cx="12" cy="4" r="2"/><path d="M12 9l0 7"/></svg></span> Women Fashion</div>
    <div class="cat-pill" data-cat="Kids Wear" data-slug="kids-wear" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 10l.01 0"/><path d="M15 10l.01 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><path d="M12 3a2 2 0 0 0 0 4"/></svg></span> Kids Wear</div>
    <div class="cat-pill" data-cat="Electronics" data-slug="electronics" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z"/><path d="M11 4h2"/><path d="M12 17v.01"/></svg></span> Electronics</div>
    <div class="cat-pill" data-cat="Mobile Accessories" data-slug="mobile-accessories" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M4 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"/><path d="M15 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg></span> Mobile Accessories</div>
    <div class="cat-pill" data-cat="Footwear" data-slug="footwear" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/></svg></span> Footwear</div>
    <div class="cat-pill" data-cat="Home Decor" data-slug="home-decor" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/></svg></span> Home Decor</div>
    <div class="cat-pill" data-cat="Jewellery" data-slug="jewellery" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5"/><path d="M10 12l-2 -2.2l.6 -1"/><path d="M14 12l2 -2.2l-.6 -1"/></svg></span> Jewellery</div>
    <div class="cat-pill" data-cat="Ethnic Wear" data-slug="ethnic-wear" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275l5.813 1.912l-5.813 1.912a2 2 0 0 0 -1.275 1.275l-1.912 5.813l-1.912 -5.813a2 2 0 0 0 -1.275 -1.275l-5.813 -1.912l5.813 -1.912a2 2 0 0 0 1.275 -1.275l1.912 -5.813z"/></svg></span> Ethnic Wear</div>
    <div class="cat-pill" data-cat="Bags & Wallets" data-slug="bags-wallets" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/><path d="M12 12l0 .01"/><path d="M3 13a20 20 0 0 0 18 0"/></svg></span> Bags & Wallets</div>
    <div class="cat-pill" data-cat="Watches" data-slug="watches" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 7l0 5l3 3"/><path d="M9 18l0 3l6 0l0 -3"/><path d="M9 6l0 -3l6 0l0 3"/></svg></span> Watches</div>
    <div class="cat-pill" data-cat="Beauty & Care" data-slug="beauty-care" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M5 21c.5 -4.5 2.5 -8 7 -10"/><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z"/></svg></span> Beauty & Care</div>
    <div class="cat-pill" data-cat="Sports & Fitness" data-slug="sports-fitness" onclick="setCatPill(this)"><span class="emoji"><svg class="cat-svg" viewBox="0 0 24 24"><path d="M2 12h1"/><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"/><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"/><path d="M9 12h6"/><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"/><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"/><path d="M22 12h-1"/></svg></span> Sports & Fitness</div>
  </div>
  <button id="catBarRight" onclick="scrollBar(1)" aria-label="Scroll right"
    style="flex-shrink:0;width:34px;height:34px;margin:0 8px 0 4px;border-radius:50%;border:1.5px solid #1a56db;background:#1a56db;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;z-index:20;box-shadow:0 4px 16px rgba(26,86,219,.32);"
    onmouseover="if(!this.disabled){this.style.background='#1042b0';this.style.borderColor='#1042b0';this.style.boxShadow='0 6px 22px rgba(26,86,219,.45)';}"
    onmouseout="if(!this.disabled){this.style.background='#1a56db';this.style.borderColor='#1a56db';this.style.boxShadow='0 4px 16px rgba(26,86,219,.32)';}">
    <svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:#fff;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;pointer-events:none;"><polyline points="9 6 15 12 9 18"/></svg>
  </button>
</div>
`;

  /* ─────────────────────────────────────────────────────────
     3. FOOTER HTML
     (Footer columns + Floating WhatsApp button)

     ✏️  Yahaan changes karo — sabhi pages pe reflect hoga
  ───────────────────────────────────────────────────────── */
  const FOOTER_HTML = `
<!-- FOOTER -->
<footer class="footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="bahabasket-logo.png" alt="BahaBasket" style="height:52px;width:auto;display:block;margin-bottom:12px;filter:brightness(0) invert(1);" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<h3 style=\'color:#fff;font-family:Baloo 2,cursive;font-size:22px;margin-bottom:10px;\'>BahaBasket</h3>')">
      <p>India's hyperlocal digital marketplace. Discover the best local shops in your city and connect directly on WhatsApp.</p>
      <div class="footer-social">
        <div class="social-btn fb"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
        <div class="social-btn ig"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div>
        <div class="social-btn x-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.893l4.263 5.632 5.838-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
        <div class="social-btn wa"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg></div>
      </div>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul class="footer-links">
        <li><a href="local-bazaar-hub.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</a></li>
        <li><a href="shop-directory.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/><path d="M1 21h22"/><path d="M9 21V9h6v12"/></svg>Shop Directory</a></li>
        <li><a href="product-listings.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>All Products</a></li>
        <li><a href="offers.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>Today's Offers</a></li>
        <li><a href="categories.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Categories</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>For Sellers</h4>
      <ul class="footer-links">
        <li><a href="shopkeeper-registration.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Register Shop</a></li>
        <li><a href="seller-dashboard.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Add Products</a></li>
        <li><a href="pricing.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.57a2.41 2.41 0 0 0 3.41 0l7.57-7.57a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/></svg>Membership Plans</a></li>
        <li><a href="seller-dashboard.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>Seller Dashboard</a></li>
        <li><a href="how-it-works.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Seller Help</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Support</h4>
      <ul class="footer-links">
        <li><a href="about-us.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>About Us</a></li>
        <li><a href="contact-us.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Contact Us</a></li>
        <li><a href="faq.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>FAQ</a></li>
        <li><a href="privacy-policy.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Privacy Policy</a></li>
        <li><a href="coming-soon.html"><svg style="vertical-align:-2px;margin-right:5px;opacity:.7;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>Terms of Service</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2024 BahaBasket. Made with ❤️ for India's Local Businesses.</div>
    <div>
      <svg style="vertical-align:-2px;margin-right:5px;" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Secure ·
      <svg style="vertical-align:-2px;margin-right:5px;" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg> WhatsApp-Powered ·
      <svg style="vertical-align:-2px;margin-right:5px;" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Hyperlocal · 🇮🇳 Made in India
    </div>
  </div>
</footer>

<!-- FLOATING WHATSAPP -->
<div class="float-wa">
  <div class="float-wa-tooltip">
    <svg style="vertical-align:-6px;margin-right:8px;flex-shrink:0;" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>
    Shop via WhatsApp!
  </div>
  <div class="float-wa-btn" title="Chat on WhatsApp"
    onclick="window.open('https://wa.me/919876543210?text=Hello! I want to shop from BahaBasket.','_blank')">
    <svg viewBox="0 0 16 16" fill="#fff" width="28" height="28"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
  </div>
</div>
`;

  /* ─────────────────────────────────────────────────────────
     4. INJECT — CSS + HTML dono inject karta hai
  ───────────────────────────────────────────────────────── */
  function injectComponents() {
    // CSS inject karo <head> mein
    if (!document.getElementById('lbh-shared-styles')) {
      var style = document.createElement('style');
      style.id = 'lbh-shared-styles';
      style.textContent = SHARED_CSS;
      document.head.appendChild(style);
    }

    // Header inject karo
    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      headerEl.innerHTML = HEADER_HTML;
    }

    // Footer inject karo
    var footerEl = document.getElementById('site-footer');
    if (footerEl) {
      footerEl.innerHTML = FOOTER_HTML;
      // Float-WA tooltip 4s baad fade out
      setTimeout(function () {
        var tooltip = document.querySelector('.float-wa-tooltip');
        if (tooltip) { tooltip.style.transition = 'opacity .6s'; tooltip.style.opacity = '0'; }
      }, 4000);
    }

    // Event listeners sirf ek baar attach karo (double-call safe)
    if (!injectComponents._listenersAdded) {
      injectComponents._listenersAdded = true;

      // Navbar scroll effect
      window.addEventListener('scroll', function () {
        var nav = document.getElementById('mainNavbar');
        if (nav) {
          nav.style.boxShadow = window.scrollY > 50
            ? '0 4px 24px rgba(0,0,0,.12)'
            : '0 2px 16px rgba(0,0,0,.06)';
        }
      });

      // Side drawer — ESC key se close
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var drawer = document.getElementById('sideDrawer');
          if (drawer && drawer.classList.contains('open')) toggleMobileMenu();
        }
      });

      // catBarStrip scroll arrows init
      var catStrip = document.getElementById('catBarStrip');
      if (catStrip) catStrip.addEventListener('scroll', updateBarArrows);

      // Search placeholder animation shuru karo
      setTimeout(animatePlaceholder, 1000);
    }
  }

  /* ─────────────────────────────────────────────────────────
     5. SHARED NAVBAR + CATEGORY BAR JS
  ───────────────────────────────────────────────────────── */
  function toggleMobileMenu() {
    var btn     = document.getElementById('hamburgerBtn');
    var drawer  = document.getElementById('sideDrawer');
    var overlay = document.getElementById('sideDrawerOverlay');
    if (!btn || !drawer) return;
    var isOpen = drawer.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open', isOpen);
    btn.classList.toggle('open', isOpen);
    // Prevent body scroll when drawer is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function scrollBar(dir) {
    var strip = document.getElementById('catBarStrip');
    if (strip) strip.scrollBy({ left: dir * 220, behavior: 'smooth' });
    setTimeout(updateBarArrows, 350);
  }

  function updateBarArrows() {
    var strip = document.getElementById('catBarStrip');
    var lBtn  = document.getElementById('catBarLeft');
    var rBtn  = document.getElementById('catBarRight');
    if (!strip || !lBtn || !rBtn) return;
    var atStart = strip.scrollLeft <= 4;
    var atEnd   = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
    lBtn.toggleAttribute('disabled', atStart);
    rBtn.toggleAttribute('disabled', atEnd);
  }

  function setCatPill(el) {
    // Visual: active class toggle
    document.querySelectorAll('#catBarStrip .cat-pill').forEach(function (p) {
      p.classList.remove('active');
    });
    el.classList.add('active');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // Action: page-specific callback → warna search-results pe navigate karo
    var catText = el.getAttribute('data-cat') || (el.textContent || el.innerText || '').trim();

    // Agar page ne apna handler register kiya hai toh use call karo
    if (typeof window.onCatPillClick === 'function') {
      window.onCatPillClick(catText, el);
      return;
    }

    // Default: product-listings.html pe navigate karo with category filter
    var slug = el.getAttribute('data-slug') || '';
    if (slug) {
      window.location.href = 'product-listings.html?cat=' + encodeURIComponent(slug);
    } else {
      window.location.href = 'product-listings.html';
    }
  }

  /* ─────────────────────────────────────────────────────────
     6. ANIMATED SEARCH PLACEHOLDER
  ───────────────────────────────────────────────────────── */
  var SEARCH_PLACEHOLDERS = [
    'Search Men Kurta...',
    'Search Women Saree...',
    'Search Electronics...',
    'Search Jewellery...',
    'Search Kids Wear...',
    'Search Footwear...',
    'Search Home Decor...',
    'Search Mobile Phones...',
    'Search Sports Shoes...',
    'Search Local Shops...'
  ];
  var phIndex = 0, phChar = 0, phDeleting = false;

  function animatePlaceholder() {
    var input = document.getElementById('navSearchInput');
    if (!input || document.activeElement === input) {
      setTimeout(animatePlaceholder, 200);
      return;
    }
    var current = SEARCH_PLACEHOLDERS[phIndex];
    if (!phDeleting) {
      phChar++;
      input.placeholder = current.slice(0, phChar);
      if (phChar === current.length) {
        phDeleting = true;
        setTimeout(animatePlaceholder, 1800);
      } else {
        setTimeout(animatePlaceholder, 60);
      }
    } else {
      phChar--;
      input.placeholder = current.slice(0, phChar);
      if (phChar === 0) {
        phDeleting = false;
        phIndex = (phIndex + 1) % SEARCH_PLACEHOLDERS.length;
        setTimeout(animatePlaceholder, 300);
      } else {
        setTimeout(animatePlaceholder, 35);
      }
    }
  }

  /* ─────────────────────────────────────────────────────────
     7. SHOP VIA DROPDOWN — TOGGLE + SELECTION
  ───────────────────────────────────────────────────────── */
  var _shopViaSelected = ''; // tracks last selection

  function openShopViaMenu() {
    var dropdown = document.getElementById('shopViaDropdown');
    var chevron  = document.getElementById('shopViaChevron');
    if (!dropdown) return;
    var isOpen = dropdown.style.display === 'flex';
    // Toggle
    if (isOpen) {
      dropdown.style.display = 'none';
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
      dropdown.style.display = 'flex';
      if (chevron) chevron.style.transform = 'rotate(90deg)';
      // Close on outside click
      setTimeout(function () {
        document.addEventListener('click', function closeDropdown(e) {
          var wrap = document.querySelector('.nav-shop-via-wrap');
          if (wrap && !wrap.contains(e.target)) {
            dropdown.style.display = 'none';
            if (chevron) chevron.style.transform = 'rotate(0deg)';
            document.removeEventListener('click', closeDropdown);
          }
        });
      }, 10);
    }
  }

  var WA_ICON   = '<svg viewBox="0 0 24 24" fill="#25d366" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>';
  var CHAT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  function selectShopVia(type, e) {
    if (e) { e.stopPropagation(); }
    _shopViaSelected = type;

    var iconWrap  = document.getElementById('shopViaIcon');
    var label     = document.getElementById('shopViaLabel');
    var checkWA   = document.getElementById('shopViaCheckWA');
    var checkChat = document.getElementById('shopViaCheckChat');
    var dropdown  = document.getElementById('shopViaDropdown');
    var chevron   = document.getElementById('shopViaChevron');

    if (type === 'wa') {
      if (iconWrap) iconWrap.innerHTML = WA_ICON;
      if (label)    { label.textContent = 'WhatsApp'; label.style.color = '#128C7E'; }
      if (checkWA)   checkWA.style.display  = 'flex';
      if (checkChat) checkChat.style.display = 'none';
    } else {
      if (iconWrap) iconWrap.innerHTML = CHAT_ICON;
      if (label)    { label.textContent = 'Live Chat'; label.style.color = 'var(--primary)'; }
      if (checkWA)   checkWA.style.display  = 'none';
      if (checkChat) checkChat.style.display = 'flex';
    }

    // Close dropdown
    if (dropdown) { dropdown.style.display = 'none'; }
    if (chevron)  { chevron.style.transform = 'rotate(0deg)'; }

    // Toggle card buttons on all product cards
    document.body.classList.toggle('shop-via-chat', type === 'chat');
  }

  /* ── LIVE CHAT POPUP ── */
  function openLiveChatPopup() {
    if (document.getElementById('liveChatPopup')) {
      document.getElementById('liveChatPopup').style.display = 'flex';
      return;
    }
    var popup = document.createElement('div');
    popup.id = 'liveChatPopup';
    popup.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:flex;align-items:flex-end;justify-content:flex-end;padding:24px;" onclick="if(event.target===this)closeLiveChatPopup()">
        <div style="width:340px;background:#fff;border-radius:18px;box-shadow:0 24px 64px rgba(0,0,0,.18);display:flex;flex-direction:column;overflow:hidden;animation:menuSlide .25s ease;max-height:520px;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));padding:16px 18px;display:flex;align-items:center;gap:12px;">
            <div style="width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;color:#fff;">Live Chat Support</div>
              <div style="font-size:12px;color:rgba(255,255,255,.75);margin-top:1px;display:flex;align-items:center;gap:5px;">
                <span style="width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block;"></span> Online — typically replies instantly
              </div>
            </div>
            <button onclick="closeLiveChatPopup()" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;line-height:0;transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,.28)'" onmouseout="this.style.background='rgba(255,255,255,.15)'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <!-- Chat messages -->
          <div id="liveChatMessages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f8fafc;min-height:220px;max-height:280px;">
            <div style="display:flex;gap:8px;align-items:flex-end;">
              <div style="width:28px;height:28px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;">
                <svg viewBox="0 0 24 24" fill="#fff" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div style="background:#fff;border:1px solid var(--border);border-radius:12px 12px 12px 2px;padding:10px 13px;font-size:13px;color:var(--text-dark);max-width:220px;line-height:1.5;box-shadow:0 1px 4px rgba(0,0,0,.06);">
                👋 Hello! Welcome to <strong>BahaBasket</strong>.<br>How can I help you today?
              </div>
            </div>
          </div>
          <!-- Input -->
          <div style="padding:12px 14px;border-top:1px solid var(--border);display:flex;gap:8px;background:#fff;">
            <input id="liveChatInput" type="text" placeholder="Type your message..."
              style="flex:1;border:1.5px solid var(--border);border-radius:50px;padding:9px 14px;font-size:13px;outline:none;font-family:inherit;transition:border-color .2s;color:var(--text-dark);"
              onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"
              onkeydown="if(event.key==='Enter')sendLiveChatMsg()">
            <button onclick="sendLiveChatMsg()" style="width:38px;height:38px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .2s;line-height:0;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(popup);
  }

  function closeLiveChatPopup() {
    var p = document.getElementById('liveChatPopup');
    if (p) p.style.display = 'none';
  }

  function sendLiveChatMsg() {
    var input = document.getElementById('liveChatInput');
    var msgs  = document.getElementById('liveChatMessages');
    if (!input || !msgs || !input.value.trim()) return;
    var text = input.value.trim();
    input.value = '';

    // User message
    var userMsg = document.createElement('div');
    userMsg.style.cssText = 'display:flex;justify-content:flex-end;';
    userMsg.innerHTML = '<div style="background:var(--primary);color:#fff;border-radius:12px 12px 2px 12px;padding:9px 13px;font-size:13px;max-width:220px;line-height:1.5;">' + text + '</div>';
    msgs.appendChild(userMsg);
    msgs.scrollTop = msgs.scrollHeight;

    // Auto reply after 1s
    setTimeout(function () {
      var botMsg = document.createElement('div');
      botMsg.style.cssText = 'display:flex;gap:8px;align-items:flex-end;';
      botMsg.innerHTML = '<div style="width:28px;height:28px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0;"><svg viewBox="0 0 24 24" fill="#fff" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div style="background:#fff;border:1px solid var(--border);border-radius:12px 12px 12px 2px;padding:10px 13px;font-size:13px;color:var(--text-dark);max-width:220px;line-height:1.5;box-shadow:0 1px 4px rgba(0,0,0,.06);">Thanks for reaching out! Our team will assist you shortly. 😊</div>';
      msgs.appendChild(botMsg);
      msgs.scrollTop = msgs.scrollHeight;
    }, 1000);
  }

  /* ─────────────────────────────────────────────────────────
     8. GLOBAL EXPORTS
     (Page-specific JS in bhi call kar sake)
  ───────────────────────────────────────────────────────── */
  window.toggleMobileMenu   = toggleMobileMenu;
  window.animatePlaceholder = animatePlaceholder;
  window.scrollBar          = scrollBar;
  window.updateBarArrows    = updateBarArrows;
  window.setCatPill         = setCatPill;
  window.openShopViaMenu    = openShopViaMenu;
  window.selectShopVia      = selectShopVia;
  window.openLiveChatPopup  = openLiveChatPopup;
  window.closeLiveChatPopup = closeLiveChatPopup;
  window.sendLiveChatMsg    = sendLiveChatMsg;
  window.injectComponents   = injectComponents; // footer ke liye second call

  /* ─────────────────────────────────────────────────────────
     9. RUN — Seedha inject karo
     Script ab #site-header ke BAAD aata hai → element already
     DOM mein hai → injectComponents() turant chalao.
  ───────────────────────────────────────────────────────── */
  injectComponents();

  /* ─────────────────────────────────────────────────────────
     10. AUTH NAV — Login button → user name + Logout if logged in
  ───────────────────────────────────────────────────────── */
  function applyAuthNav() {
    var token = localStorage.getItem('bb_token');
    var user  = null;
    try { user = JSON.parse(localStorage.getItem('bb_user')); } catch(e) {}
    if (!token || !user) return; // not logged in — keep defaults

    // Support both custom users table format AND raw Supabase auth user format
    var meta      = user.user_metadata || {};
    var userName  = (user.name || meta.name || user.phone || meta.phone || 'My Account').split(' ')[0];
    // Use login type chosen by user (not DB role) — buyer tab → user dashboard
    var loginType = localStorage.getItem('bb_login_type') || 'buyer';
    var isSeller  = (loginType === 'seller');

    var personSVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    var logoutSVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';

    function doLogout(e) {
      e.preventDefault();
      localStorage.removeItem('bb_token');
      localStorage.removeItem('bb_user');
      window.location.href = 'index.html';
    }

    // ── Desktop navbar ──
    var navLogin = document.getElementById('navLoginBtn');
    var navReg   = document.getElementById('navRegisterBtn');
    if (navLogin) {
      navLogin.removeAttribute('href');
      navLogin.style.cursor = 'pointer';
      navLogin.innerHTML = personSVG + ' ' + userName;
      navLogin.onclick = function() {
        window.location.href = isSeller ? 'seller-dashboard.html' : 'user-dashboard.html';
      };
    }
    if (navReg) {
      navReg.removeAttribute('href');
      navReg.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
      navReg.innerHTML = logoutSVG + ' Logout';
      navReg.onclick = doLogout;
    }

    // ── Mobile drawer ──
    var drLogin = document.getElementById('drawerLoginBtn');
    var drReg   = document.getElementById('drawerRegisterBtn');
    if (drLogin) {
      drLogin.removeAttribute('href');
      drLogin.innerHTML = personSVG + ' ' + userName;
      drLogin.onclick = function() {
        window.location.href = isSeller ? 'seller-dashboard.html' : 'user-dashboard.html';
      };
    }
    if (drReg) {
      drReg.removeAttribute('href');
      drReg.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
      drReg.innerHTML = logoutSVG + ' Logout';
      drReg.onclick = doLogout;
    }
  }

  // ── UPDATE LOGIN LINKS — add ?next= so user returns here after login ──
  function updateLoginLinks() {
    var token = localStorage.getItem('bb_token');
    if (token) return; // already logged in — buttons already replaced by applyAuthNav
    var next = encodeURIComponent(window.location.href);
    var btns = document.querySelectorAll('#navLoginBtn, #drawerLoginBtn');
    btns.forEach(function(btn) {
      if (btn && btn.tagName === 'A') {
        btn.href = 'login-register.html?next=' + next;
      }
    });
  }

  // Run immediately after inject (sync) + again after full DOM load (safety)
  applyAuthNav();
  updateLoginLinks();
  document.addEventListener('DOMContentLoaded', function() {
    applyAuthNav();
    updateLoginLinks();
  });
  window.refreshAuthNav = applyAuthNav; // callable from any page after login

})();
