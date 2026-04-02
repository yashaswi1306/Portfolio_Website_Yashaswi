function both_themes(night) {
    document.body.classList.toggle('dark', night);
    if (night) {
        localStorage.setItem('theme', 'dark');
        document.querySelectorAll('#sun')
            .forEach(el => el.style.display = 'block');
        document.querySelectorAll('#moon')
            .forEach(el => el.style.display = 'none');
    }
    else {
        localStorage.setItem('theme', 'light');
        document.querySelectorAll('#moon')
            .forEach(el => el.style.display = 'block');
        document.querySelectorAll('#sun')
            .forEach(el => el.style.display = 'none');
    }

}

function theme_change() {
    both_themes(localStorage.getItem('theme') === 'dark');
    const t=document.getElementById('theme');
    t.addEventListener('click', () => both_themes(!document.body.classList.contains('dark')));
}


function type_change() {
    const quoted = document.getElementById('cursor_text');
    if (!quoted) {
        return;
    }
    const quotes = ["I have no special talent...\n\n\nI'm only passionately curious.", 'Learn from yesterday...\n\n\nLive for today...\n\n\nHope for tomorrow.'];
    const letterspeed = 80;
    const delspeed = 35;
    const stop = 1500;
    let flag = false;
    let i = 0;
    let j = 0;
    
    function lines(text){
        quoted.innerHTML=text.replace(/\n/g,'<br>')+' <span id="cursor" aria-hidden="true">|</span>';
    }
    function blink() {
        const k = quotes[i];
        if (!flag) {
            ++j;
            lines(k.slice(0, j));
            if (j == k.length) {
                flag = true;
                setTimeout(blink, stop);
                return
            }
            setTimeout(blink, letterspeed);
        }
        else
        {
            --j;
            lines(k.slice(0,j));
            if(j==0)
            {
                i=(i+1)%quotes.length;
                flag=false;
                setTimeout(blink,350);
                return;
            }
            setTimeout(blink, delspeed);
        }

   

    
    }
    setTimeout(blink, 600);
}

function scroll_to_view(){
    const item=document.querySelectorAll('.fade_to_view');
    if(item.length==0)
    {
        return;
    }
    const io= new IntersectionObserver((parts)=>{
        parts.forEach(part =>{
            if(part.isIntersecting){
                part.target.classList.add('in_view');
                io.unobserve(part.target);
            }
        });
    },
{
    threshold: 0.15, rootMargin: '0px 0px -30px 1px'
}); item.forEach(p => io.observe(p));
}

function open_mobile(){
    const hamburger=document.getElementById('hamburger');
    const mobile_menu = document.getElementById('mobile_menu');
    if(!hamburger||!mobile_menu)
    {
        return;
    }
    hamburger.addEventListener('click',()=>
    {
        hamburger.classList.toggle('open');
        mobile_menu.classList.toggle('open');
    });
}

function close_mobile(){
    const mm= document.getElementById('mobile_menu');
    mm.classList.remove('open');
    const hb=document.getElementById('hamburger');
    hb.classList.remove('open');
}
window.close_mobile=close_mobile;
document.addEventListener('DOMContentLoaded',() => {
    theme_change();
    type_change();
    scroll_to_view();
    open_mobile();
});



// for project filters.


function current(filter)
{
    const fltr= document.querySelectorAll('.fltr');
    for (let i=0;i<fltr.length;i++)
    {
        fltr[i].classList.remove('curr');
    }
    filter.classList.add('curr');
    
}


const fltrs= document.querySelectorAll('.fltr');
for(let i=0;i<fltrs.length;i++)
{
    fltrs[i].addEventListener('click',function(){

        const curr=this.dataset.fltr;
        current(this);
        filtering(curr);
    });
}


function filtering(filter)
{
    const proj= document.querySelectorAll('.project');
    for(let i=0;i<proj.length;i++)
    {
        const p0=proj[i];
        const lan=p0.dataset.lang;
        const list=lan.split(/\s+/);
        if(filter==="all")
        {
            p0.style.display="";
        }
        else if(list.includes(filter))
        {
            p0.style.display="";
        }
        else
        {
            p0.style.display="none";

        }

    }
}




