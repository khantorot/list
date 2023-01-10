let mob = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;



const works = document.querySelector('.works');
const path = document.querySelector('.path');


function showWork(group) {
    let out = '';


    if (group == 'all_dir') {
        for (x in data) {
            for (y in data[x].work) {
                out += '<div class="work_item" data-name="' + data[x].work[y].title + '">';
                out += '<span class="symbol">' + data[x].work[y].symbol + '</span>';
                out += '<span class="title">' + data[x].work[y].title + '</span>';
                out += '</div>';
            }
        }

        path.querySelector('.list_directory').innerHTML = '';
        path.querySelector('.group_directory').innerHTML = '';
        path.querySelector('.work_directory').innerHTML = '';

        back_btn.classList.add('hide_btn');
        list_btn.classList.remove('hide_btn');

    } else if (group == 'list_dir') {
        for (x in data) {
            out += '<div class="work_item group_item" data-name="' + data[x].group + '">';
            out += '<span class="symbol">' + data[x].symbol + '</span>';
            out += '<span class="title">' + data[x].group + '</span>';
            out += '<span class="number">/ ' + data[x].work.length + '</span>';
            out += '</div>';
        }

        path.querySelector('.list_directory').innerHTML = 'groups /';
        path.querySelector('.group_directory').innerHTML = '';
        path.querySelector('.work_directory').innerHTML = '';

        back_btn.classList.remove('hide_btn');
        list_btn.classList.add('hide_btn');

    } else{
        for (x in data) {
            if (group == data[x].group) {
                for (y in data[x].work) {
                    out += '<div class="work_item" data-name="' + data[x].work[y].title + '">';
                    out += '<span class="symbol">' + data[x].work[y].symbol + '</span>';
                    out += '<span class="title">' + data[x].work[y].title + '</span>';
                    out += '</div>';
                }
    
                path.querySelector('.list_directory').innerHTML = 'groups /';
                path.querySelector('.group_directory').innerHTML = data[x].group + ' /';
                path.querySelector('.group_directory').setAttribute("data-name", data[x].group);
                path.querySelector('.work_directory').innerHTML = '';
            } else {
                for (y in data[x].work) {
                    if (data[x].work[y].title == group) {
                        out += '<div class="work_data">';
                        out += '<div class="content">';
                        out += '<span class="symbol">' + data[x].work[y].symbol + '</span>';
                        out += '</div>';
                        out += '<div class="info">';
                        out += '<h4 class="title">' + data[x].work[y].title + '</h4>';
                        out += '<p class="description">' + data[x].work[y].description + '</p>';
                        out += '<a href="' + data[x].work[y].link + '" target="_blank" class="link">open</a>';
                        out += '</div>';
                        out += '</div>';
    
                        path.querySelector('.list_directory').innerHTML = 'groups /';
                        path.querySelector('.group_directory').innerHTML = data[x].group + ' /';
                        path.querySelector('.group_directory').setAttribute("data-name", data[x].group);
                        path.querySelector('.work_directory').innerHTML = data[x].work[y].title;
                    }
                }
            }
        }
        back_btn.classList.remove('hide_btn');
        list_btn.classList.add('hide_btn');
    }

    works.innerHTML = out;

    if (mob) {
        window.scrollTo(0, 0);
    }
}



const back_btn = document.querySelector('.back_btn');
const list_btn = document.querySelector('.list_btn');

back_btn.addEventListener('click', function(){
    let i = 0;
    i = checkDir();
    if (i == 3) {
        showWork((path.querySelector('.group_directory').innerHTML).replace(/[^a-zа-яё0-9]/gi, ''));
    } else if(i == 2){
        showWork('list_dir');
    } else {
        showWork('all_dir');
    }
})

list_btn.addEventListener('click', function(){
    showWork('list_dir');
})

function checkDir(){
    if (path.querySelector('.list_directory').innerHTML != '') {
        if (path.querySelector('.group_directory').innerHTML != ''){
            if (path.querySelector('.work_directory').innerHTML != ''){
                return 3;
            }
            return 2;
        }
        return 1;
    }
    return 0;
}

works.addEventListener('click', function (e) {
    if (e.target.classList.contains('work_item')) {
        let data_name = e.target.getAttribute('data-name');
        showWork(data_name)
    }
})


path.addEventListener('click', function (e) {
    if (e.target.classList.contains('list_directory')) {
        showWork('list_dir');
    } else if (e.target.classList.contains('parent_directory')) {
        showWork('all_dir');
    } else if (e.target.classList.contains('group_directory')) {
        let data_name = e.target.getAttribute('data-name');
        showWork(data_name)
    }
})




document.querySelector('.search').addEventListener('keyup', function () {
    let work_items = document.querySelectorAll('.work_item');
    let filter = this.value.toLowerCase();

    work_items.forEach(element => {
        const string = element.getAttribute('data-name');

        if (!string.includes(filter) || filter == '') {
            element.classList.remove('hide_project');
        } else {
            element.classList.add('hide_project');
        }
    });
})


window.addEventListener('load', function(){
    showWork('all_dir');
})