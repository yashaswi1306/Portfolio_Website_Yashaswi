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
    both_themes(localStorage.getItem('theme') !== 'light');
    const t = document.getElementById('theme');
    t.addEventListener('click', () => both_themes(!document.body.classList.contains('dark')));
}


function type_change() {
    const quoted = document.getElementById('cursor_text');
    if (!quoted) {
        return;
    }
    class type_text {
        constructor(a1, a2) {
            this.a1 = a1;
            this.a2 = a2;
        }

        s1(){
        const quoted = this.a1;
        const { quotes, letterspeed, delspeed, duration } = this.a2;
        const stop = duration;
        let flag = false;
        let i = 0;
        let j = 0;
        function lines(text) {
    quoted.innerHTML = text;
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
    else {
        --j;
        lines(k.slice(0, j));
        if (j == 0) {
            i = (i + 1) % quotes.length;
            flag = false;
            setTimeout(blink, 350);
            return;
        }
    
        setTimeout(blink, delspeed);
    }
}

    setTimeout(blink, 600);

    }
}

new type_text(quoted,{quotes : ["I have no special talent...","I'm only passionately curious.", "Learn from yesterday...","Live for today...","Hope for tomorrow."],
 letterspeed : 80,
 delspeed : 35,
 duration : 1500}).s1();

}







function scroll_to_view() {
    const item = document.querySelectorAll('.fade_to_view');
    if (item.length == 0) {
        return;
    }
    const io = new IntersectionObserver((parts) => {
        parts.forEach(part => {
            if (part.isIntersecting) {
                part.target.classList.add('in_view');
                io.unobserve(part.target);
            }
        });
    },
        {
            threshold: 0.15, rootMargin: '0px 0px -30px 1px'
        }); item.forEach(p => io.observe(p));
}

function open_mobile() {
    const hamburger = document.getElementById('hamburger');
    const mobile_menu = document.getElementById('mobile_menu');
    if (!hamburger || !mobile_menu) {
        return;
    }
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobile_menu.classList.toggle('open');
    });
}

function close_mobile() {
    const mm = document.getElementById('mobile_menu');
    mm.classList.remove('open');
    const hb = document.getElementById('hamburger');
    hb.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
    theme_change();
    type_change();
    scroll_to_view();
    open_mobile();
    form();
    const tag = new URLSearchParams(location.search).get('tags');
    if (tag) {
        filtering(tag);
        const c2 = document.querySelector(`.fltr[data-fltr=${tag}]`);
        if (c2) {
            current(c2);
        }
    }
});



// for project filters.


function current(filter) {
    const fltr = document.querySelectorAll('.fltr');
    for (let i = 0; i < fltr.length; i++) {
        fltr[i].classList.remove('curr');
        fltr[i].removeAttribute('aria-current');
    }
    filter.classList.add('curr');
    filter.setAttribute('aria-current','true');

}

const selected= new Set(['all']);
const fltrs = document.querySelectorAll('.fltr');
for (let i = 0; i < fltrs.length; i++) {
    fltrs[i].addEventListener('click', function () {

        const curr = this.dataset.fltr;

        if(curr==='all')
        {
            selected.clear();
            selected.add('all')
        }
        else
        {
            selected.delete('all');
            if(selected.has(curr))
            {
                selected.delete(curr);
                if(selected.size===0)
                {
                    selected.add('all');
                }
            }
            else
            {
                selected.add(curr);
            }



        }
        for (let j = 0; j < fltrs.length; j++)
        {
            if(selected.has(fltrs[j].dataset.fltr))
            {
                fltrs[j].classList.add('curr');
            }
            else{
                fltrs[j].classList.remove('curr');
            }
        }
        filtering(selected);
        history.pushState(null, '', '?tags=' + [...selected].join(','));
        // url format copied from example in the deliverabes
    });
}


function filtering(filter) {
    const proj = document.querySelectorAll('.project');
    for (let i = 0; i < proj.length; i++) {
        const p0 = proj[i];
        const lan = p0.dataset.lang;
        const list = lan.split(/\s+/);
        if (filter.has('all')) {
            p0.style.display = "";
        }
        else if (list.some(i=>filter.has(i))) {
            p0.style.display = "";
        }
        else {
            p0.style.display = "none";

        }

    }
}

//for the form filling (added last didnt know that tehre needed to be a check to ensure only valid emails can be sent)

function form() {
    const filled = document.getElementById('form');
    if (!filled) {
        return;
    }
    filled.addEventListener('submit', function (sbmt) {
        sbmt.preventDefault();
        const sub = filled.querySelector('input[type=text]');
        const mssg = filled.querySelector('textarea');
        const from = filled.querySelector('input[type=email]');

        let flag = false;
        function invalid(input) {
            const flgd = document.createElement('div');
            flgd.className = 'invalid_format';
            flgd.textContent = "You haven't filled the form correctly. Kindly ensure all fields are filled correctly."
            input.parentElement.appendChild(flgd);
            flag = true;
        }

        if ((!/^[a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,}$/.test(from.value)))
            invalid(from);
        else if ((!/\S/.test(sub.value)))
            invalid(sub);
        else if ((!/\S/.test(mssg.value)))
            invalid(mssg);

        if (flag) {
            return;
        }


        document.querySelector('.mssg_me').innerHTML =
            '<p class="Contact">Message Sent!</p>'
    });

}


