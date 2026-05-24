import { useEffect } from "react";
import interiorImg from "@/assets/portfolio-interior-gruszw21.jpg";
import cafeImg from "@/assets/portfolio-cafe-dfep6unj.jpg";
import brandImg from "@/assets/portfolio-brand-qiuw0i1o.jpg";
import "../static-site.css";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section (avoids HashRouter 404 on #anchor)
    (window as any).scrollToSection = function(id: string, e?: Event) {
      if (e) e.preventDefault();
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      (window as any).closeMenu?.();
    };

    // Mobile menu
    (window as any).toggleMenu = function() {
      var m = document.getElementById('mobileMenu')!;
      var mi = document.getElementById('menuIcon')!;
      var ci = document.getElementById('closeIcon')!;
      var open = m.style.display === 'flex';
      m.style.display = open ? 'none' : 'flex';
      mi.style.display = open ? 'block' : 'none';
      ci.style.display = open ? 'none' : 'block';
    };
    (window as any).closeMenu = function() {
      document.getElementById('mobileMenu')!.style.display = 'none';
      document.getElementById('menuIcon')!.style.display = 'block';
      document.getElementById('closeIcon')!.style.display = 'none';
    };

    // Booking
    var selectedDate: Date | null = null;
    var selectedTime: string | null = null;
    var currentMonth: number, currentYear: number;
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var times = ['10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM'];

    function updateSendBtn() {
      (document.getElementById('sendBtn') as HTMLButtonElement).disabled = !(selectedDate && selectedTime);
    }

    function renderCalendar() {
      var cal = document.getElementById('calendarPopup')!;
      var today = new Date(); today.setHours(0,0,0,0);
      var first = new Date(currentYear, currentMonth, 1);
      var lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
      var startDay = first.getDay();
      var html = '<div class="cal-header"><button class="cal-nav" id="prevMonthBtn">‹</button><span class="cal-month">' + months[currentMonth] + ' ' + currentYear + '</span><button class="cal-nav" id="nextMonthBtn">›</button></div>';
      html += '<div class="cal-days"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="cal-grid">';
      for (var i = 0; i < startDay; i++) html += '<span></span>';
      for (var d = 1; d <= lastDay; d++) {
        var dt = new Date(currentYear, currentMonth, d);
        var past = dt < today;
        var sel = selectedDate && dt.getTime() === selectedDate.getTime();
        html += '<button class="cal-day' + (past ? ' disabled' : '') + (sel ? ' selected' : '') + '"' + (past ? ' disabled' : '') + ' data-date="' + currentYear + '-' + currentMonth + '-' + d + '">' + d + '</button>';
      }
      html += '</div>';
      cal.innerHTML = html;
      document.getElementById('prevMonthBtn')?.addEventListener('click', function() { currentMonth--; if(currentMonth<0){currentMonth=11;currentYear--;} renderCalendar(); });
      document.getElementById('nextMonthBtn')?.addEventListener('click', function() { currentMonth++; if(currentMonth>11){currentMonth=0;currentYear++;} renderCalendar(); });
      cal.querySelectorAll('.cal-day:not(.disabled)').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var parts = (btn as HTMLElement).dataset.date!.split('-');
          var y = parseInt(parts[0]), m = parseInt(parts[1]), dd = parseInt(parts[2]);
          selectedDate = new Date(y, m, dd);
          document.getElementById('dateDisplay')!.textContent = months[m] + ' ' + dd + ', ' + y;
          cal.style.display = 'none';
          selectedTime = null;
          showTimeSlots();
          updateSendBtn();
        });
      });
    }

    function showTimeSlots() {
      var wrap = document.getElementById('timeSlots')!;
      var grid = document.getElementById('timeGrid')!;
      wrap.style.display = 'block';
      var html = '';
      times.forEach(function(t) { html += '<button class="time-btn" data-time="' + t + '">' + t + '</button>'; });
      grid.innerHTML = html;
      grid.querySelectorAll('.time-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          selectedTime = (btn as HTMLElement).dataset.time!;
          grid.querySelectorAll('.time-btn').forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');
          updateSendBtn();
        });
      });
    }

    (window as any).openBooking = function() {
      document.getElementById('bookingOverlay')!.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      var now = new Date(); currentMonth = now.getMonth(); currentYear = now.getFullYear();
      renderCalendar();
    };
    (window as any).closeBooking = function() {
      document.getElementById('bookingOverlay')!.style.display = 'none';
      document.body.style.overflow = '';
      selectedDate = null; selectedTime = null;
      document.getElementById('dateDisplay')!.textContent = 'Select a date';
      document.getElementById('timeSlots')!.style.display = 'none';
      document.getElementById('calendarPopup')!.style.display = 'none';
      updateSendBtn();
    };
    (window as any).toggleCalendar = function() {
      var cal = document.getElementById('calendarPopup')!;
      cal.style.display = cal.style.display === 'block' ? 'none' : 'block';
    };
    (window as any).sendBooking = function() {
      if (!selectedDate || !selectedTime) return;
      var dateStr = months[selectedDate.getMonth()] + ' ' + selectedDate.getDate() + ', ' + selectedDate.getFullYear();
      var msg = encodeURIComponent("Hi Kreat Web! I'd like to book a call on " + dateStr + " at " + selectedTime + ". Please confirm availability.");
      window.open('https://ig.me/m/kreat_web?text=' + msg, '_blank');
      (window as any).closeBooking();
    };
  }, []);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <!-- NAVBAR -->
    <nav class="site-nav" id="navbar">
      <div class="nav-container">
        <a href="#" class="nav-logo" onclick="scrollToSection('navbar', event); return false;">KREAT WEB</a>
        <div class="nav-links" id="navLinks">
          <a href="#work" class="nav-link" onclick="scrollToSection('work', event)">WORK</a>
          <a href="#about" class="nav-link" onclick="scrollToSection('about', event)">ABOUT</a>
          <a href="#process" class="nav-link" onclick="scrollToSection('process', event)">PROCESS</a>
          <a href="#contact" class="nav-link" onclick="scrollToSection('contact', event)">CONTACT</a>
          <a href="#contact" class="nav-cta-btn" onclick="scrollToSection('contact', event)">Get a Website</a>
        </div>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" onclick="toggleMenu()">
          <svg id="menuIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg id="closeIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <a href="#work" class="nav-link" onclick="scrollToSection('work', event)">WORK</a>
        <a href="#about" class="nav-link" onclick="scrollToSection('about', event)">ABOUT</a>
        <a href="#process" class="nav-link" onclick="scrollToSection('process', event)">PROCESS</a>
        <a href="#contact" class="nav-link" onclick="scrollToSection('contact', event)">CONTACT</a>
        <a href="#contact" class="nav-cta-btn" onclick="scrollToSection('contact', event)">Get a Website</a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>
      <div class="hero-content">
        <p class="hero-subtitle animate-reveal">Premium Web Design Studio</p>
        <h1 class="hero-title animate-reveal delay-1">We design websites that <span class="text-gradient italic">attract better clients</span></h1>
        <p class="hero-desc animate-reveal delay-2">Premium websites for modern brands and interior designers</p>
        <div class="hero-buttons animate-reveal delay-3">
          <a href="#work" class="btn-outline" onclick="scrollToSection('work', event)">View Work</a>
          <a href="#contact" class="btn-primary" onclick="scrollToSection('contact', event)">Get a Website</a>
        </div>
        <div class="hero-stats animate-reveal delay-4">
          <div class="stat"><span class="stat-num">3</span><span class="stat-label">Websites Built</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-num">100%</span><span class="stat-label">Client Satisfaction</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-num">7-Day</span><span class="stat-label">Delivery</span></div>
        </div>
      </div>
    </section>

    <!-- PORTFOLIO -->
    <section id="work" class="section">
      <div class="container">
        <div class="section-header">
          <p class="section-tag">Selected Work</p>
          <h2 class="section-title">Projects that <span class="text-gradient italic">convert</span></h2>
        </div>
        <div class="portfolio-grid">
          <a href="#/work/luxe-interiors" class="portfolio-item hover-lift" style="display:block">
            <div class="portfolio-img-wrap"><img src="${interiorImg}" alt="Luxe Interiors" loading="lazy" width="1280" height="864"/></div>
            <h3 class="portfolio-name">Luxe Interiors</h3>
            <p class="portfolio-cat">INTERIOR DESIGN STUDIO</p>
          </a>
          <a href="#/work/brew-co" class="portfolio-item hover-lift" style="display:block">
            <div class="portfolio-img-wrap"><img src="${cafeImg}" alt="Brew & Co." loading="lazy" width="1280" height="864"/></div>
            <h3 class="portfolio-name">Brew & Co.</h3>
            <p class="portfolio-cat">CAFÉ & LIFESTYLE BRAND</p>
          </a>
          <a href="#/work/minimal-studio" class="portfolio-item hover-lift" style="display:block">
            <div class="portfolio-img-wrap"><img src="${brandImg}" alt="Minimal Studio" loading="lazy" width="1280" height="864"/></div>
            <h3 class="portfolio-name">Minimal Studio</h3>
            <p class="portfolio-cat">MODERN BRAND</p>
          </a>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE -->
    <section id="about" class="section bg-secondary-50">
      <div class="container max-w-5xl">
        <div class="section-header">
          <p class="section-tag">Why Kreat Web</p>
          <h2 class="section-title">Not just a website.<br/><span class="text-gradient italic">A client magnet.</span></h2>
        </div>
        <div class="features-grid">
          <div class="feature-card hover-lift">
            <svg class="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
            <h3 class="feature-title">Premium Design</h3>
            <p class="feature-desc">Luxury aesthetics that position your brand above the competition</p>
          </div>
          <div class="feature-card hover-lift">
            <svg class="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
            <h3 class="feature-title">Clean Structure</h3>
            <p class="feature-desc">Intuitive layouts that guide visitors toward action</p>
          </div>
          <div class="feature-card hover-lift">
            <svg class="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <h3 class="feature-title">Built to Convert</h3>
            <p class="feature-desc">Every element designed to turn visitors into paying clients</p>
          </div>
          <div class="feature-card hover-lift">
            <svg class="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <h3 class="feature-title">Fast & Modern</h3>
            <p class="feature-desc">Lightning-fast performance on every device</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BEFORE/AFTER -->
    <section class="section">
      <div class="container max-w-5xl">
        <div class="section-header">
          <p class="section-tag">The Transformation</p>
          <h2 class="section-title">From invisible to <span class="text-gradient italic">irresistible</span></h2>
        </div>
        <div class="ba-grid">
          <div class="ba-card ba-before">
            <p class="ba-label">BEFORE</p>
            <div class="ba-list">
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><span>No website or outdated design</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><span>Low trust from potential clients</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><span>Losing clients to competitors</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><span>No online presence or credibility</span></div>
            </div>
          </div>
          <div class="ba-card ba-after">
            <p class="ba-label ba-label-accent">AFTER</p>
            <div class="ba-list">
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Premium website that impresses instantly</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>High trust and professional credibility</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Better clients reaching out to you</span></div>
              <div class="ba-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>Strong brand presence that converts</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section id="process" class="section bg-secondary-50">
      <div class="container max-w-5xl">
        <div class="section-header">
          <p class="section-tag">Our Process</p>
          <h2 class="section-title">Simple. <span class="text-gradient italic">Refined.</span> Effective.</h2>
        </div>
        <div class="process-list">
          <div class="process-step border-b-step">
            <span class="process-num">01</span>
            <div><h3 class="process-title">Understand Your Brand</h3><p class="process-desc">We dive deep into your vision, audience, and goals to craft a strategy that resonates.</p></div>
          </div>
          <div class="process-step border-b-step">
            <span class="process-num">02</span>
            <div><h3 class="process-title">Design Premium Layout</h3><p class="process-desc">Every pixel is intentional — we create a luxury design tailored to your brand.</p></div>
          </div>
          <div class="process-step">
            <span class="process-num">03</span>
            <div><h3 class="process-title">Launch Your Website</h3><p class="process-desc">We build, test, and launch a fast, responsive website that converts visitors into clients.</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SUCCESS STORY -->
    <section class="section">
      <div class="container max-w-3xl" style="text-align:center">
        <h2 class="section-title" style="margin-bottom:1.5rem">Be our next <span class="text-gradient italic">success story.</span></h2>
        <p style="color:var(--muted-fg);font-weight:300;line-height:1.7;max-width:36rem;margin:0 auto;font-size:1.125rem">We're selectively taking on founding clients at a special rate. No backlog, no junior handoffs — you work directly with the founder, start to finish.</p>
      </div>
    </section>

    <!-- CTA -->
    <section id="contact" class="section bg-secondary-50 cta-section">
      <div class="cta-glow"></div>
      <div class="container max-w-3xl cta-content">
        <p class="section-tag">Ready?</p>
        <h2 class="section-title cta-title">Let's build something <span class="text-gradient italic">better</span></h2>
        <p class="cta-desc">Your brand deserves a premium website. Let's make it happen.</p>
        <p class="pricing-label">Starting at ₹4,999 for a complete business website. No hidden costs.</p>
        <div class="cta-buttons">
          <a href="https://wa.me/919741698468" target="_blank" rel="noopener noreferrer" class="btn-primary">Chat on WhatsApp</a>
          <a href="https://ig.me/m/kreat_web" target="_blank" rel="noopener noreferrer" class="btn-outline">DM on Instagram</a>
        </div>
      </div>
    </section>

    <!-- BOOKING DIALOG -->
    <div class="dialog-overlay" id="bookingOverlay" onclick="closeBooking()">
      <div class="dialog" onclick="event.stopPropagation()">
        <button class="dialog-close" onclick="closeBooking()" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <h3 class="dialog-title">Book a Call</h3>
        <p class="dialog-desc">Pick a date and time — we'll confirm via Instagram DM.</p>
        <div class="booking-form">
          <button class="date-picker-btn" id="datePickerBtn" onclick="toggleCalendar()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            <span id="dateDisplay">Select a date</span>
          </button>
          <div class="calendar-popup" id="calendarPopup"></div>
          <div class="time-slots" id="timeSlots" style="display:none">
            <p class="time-label">Select a time</p>
            <div class="time-grid" id="timeGrid"></div>
          </div>
          <button class="btn-primary btn-full" id="sendBtn" disabled onclick="sendBooking()">SEND TO INSTAGRAM DM</button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container footer-main">
        <div>
          <p class="footer-logo">KREAT WEB</p>
          <p class="footer-tagline">Premium websites for modern brands</p>
        </div>
        <div class="footer-links">
          <a href="mailto:hello@kreat_web.com" class="footer-link">kreat_web</a>
          <a href="https://instagram.com/kreat_web" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© 2026 Kreat Web. All rights reserved.</p>
      </div>
    </footer>

        `,
      }}
    />
  );
};

export default Index;
