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
    document.getElementById('theme')?.addEventListener('click', () => both_themes(!document.body.classList.contains('dark')));
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
    document.getElementById('mobile_menu')?.classList.remove('open');
    document.getElementById('hamburger')?.classList.remove('open');
}
window.close_mobile=close_mobile;
document.addEventListener('DOMContentLoaded',() => {
    theme_change();
    type_change();
    scroll_to_view();
    open_mobile();
});