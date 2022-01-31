'use strict';

document.addEventListener('DOMContentLoaded' , () => {
    let mode = document.querySelector('.mode_button') ,
        add = document.querySelector('.add') ,
        todo_content = document.querySelector('.todo_content') ,
        add_text = document.querySelector('.add_text') ,
        bufer = [];

        function showList() {
            bufer.forEach((value) => {
                document.querySelector('.list').innerHTML+= `<li class="list_item">
                <input type="checkbox" name=""  class="done">
                <div class="text">${value}</div>
                <div class="delete"></div>
            </li> `;
            });
        }

        todo_content.addEventListener('click' , (e) => {
            let target = e.target;
            if(target.classList.contains('done')) {
                if(target.checked) {
                    target.closest('.list_item').style.cssText = 'text-decoration:line-through;';
                } else {
                    target.closest('.list_item').style.cssText = 'text-decoration:none;';
                }
            } else if(target.classList.contains('delete')) {
                let search_value = target.closest('.list_item').querySelector('.text').value;
                bufer.splice(bufer.indexOf(search_value) , 1);
                target.closest('.list_item').remove();
            }
        });

    mode.addEventListener('click' , () => {
        document.body.classList.toggle('mode');
        if(document.querySelector('.mode_button').textContent == 'D') {
            document.querySelector('.mode_button').textContent = "L";
        } else {
            document.querySelector('.mode_button').textContent = 'D';
        }
    });

    add.addEventListener('click' , () => {
        if(add_text.value) {
            add_text.classList.remove('error_input');
            document.querySelector('.list').innerHTML = "";
            let text = add_text.value;
            add_text.value = " ";
            bufer.push(text);
            showList();
        } else {
            add_text.classList.add('error_input');
        }
    });
});