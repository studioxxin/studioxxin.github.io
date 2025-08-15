// 년도 표기
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Helper: 쿼리스트링 파라미터
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// 데이터 로드
async function loadProjects(){
  const res = await fetch('/data/projects.json', { cache: 'no-store' });
  if(!res.ok) return [];
  return await res.json();
}

// 메인 페이지 렌더링
async function renderGrid(){
  const grid = document.getElementById('portfolio-grid');
  if(!grid) return;
  const items = await loadProjects();
  const makeCard = (p)=>{
    const img = p.cover || '';
    return `
      <a class="card" href="/project.html?slug=${encodeURIComponent(p.slug)}" data-cat="${p.category}">
        ${img ? `<img class="thumb" src="${img}" alt="${p.title}">` : `<div class="thumb" style="display:flex;align-items:center;justify-content:center;background:#121212">No Image</div>`}
        <div class="meta">
          <div class="title">${p.title}</div>
          <div class="category">${p.category || ''}</div>
        </div>
      </a>`;
  };
  grid.innerHTML = items.map(makeCard).join('');

  // 필터
  const buttons = document.querySelectorAll('.filters button');
  buttons.forEach(btn=>btn.addEventListener('click', ()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card=>{
      if(f==='all' || card.dataset.cat===f) card.style.display='block';
      else card.style.display='none';
    });
  }));
}
