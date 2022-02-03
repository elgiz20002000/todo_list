'use strict';

document.addEventListener('DOMContentLoaded' , () => {
    let mode = document.querySelector('.mode_button') ,
        add = document.querySelector('.add') ,
        todo_content = document.querySelector('.todo_content') ,
        add_text = document.querySelector('.add_text') ,
        bufer = [];

    function showList() {
        bufer.forEach((value) => {
            if(value.done == true) {
                document.querySelector('.list').innerHTML+= `<li class="list_item" style="text-decoration:line-through;">
                <input type="checkbox" name=""  class="done" checked>
                <div class="text">${value.text}</div>
                <div class="delete"></div>
                </li> `;
            } else {
                document.querySelector('.list').innerHTML+= `<li class="list_item">
                <input type="checkbox" name=""  class="done">
                <div class="text">${value.text}</div>
                <div class="delete"></div>
                </li> `;
            }
        });
    }
    
    try {
        if(JSON.parse(localStorage.getItem("bufer"))) {
            if((JSON.parse(localStorage.getItem("bufer")).length > 0 )) {
                bufer = JSON.parse(localStorage.getItem("bufer"));
                showList();
            }
        } else {
            localStorage.setItem("bufer", JSON.stringify(bufer));
        }
    } catch (error) {
        console.log(error);
    }

    todo_content.addEventListener('click' , (e) => {
        let target = e.target;

        if(target.classList.contains('done')) {
            let checked , search_value = target.closest('.list_item').querySelector('.text').textContent;
            if(target.checked) {
                target.closest('.list_item').style.cssText = 'text-decoration:line-through;';
                checked = true;
            } else {
                target.closest('.list_item').style.cssText = 'text-decoration:none;';
                checked = false;
            }
            bufer.forEach((item) => {
                if(item.text == search_value) {
                    item.done = checked;
                    localStorage.setItem('bufer' , JSON.stringify(bufer));
                }
            });

        } else if(target.classList.contains('delete')) {
            let search_value = target.closest('.list_item').querySelector('.text').textContent;
            bufer.forEach((item , index) => {
                if(item.text == search_value) {
                    bufer.splice(index , 1);
                }
            });
            localStorage.setItem('bufer' , JSON.stringify(bufer));
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
            let list = {
                text:add_text.value ,
                done:false
            };
            add_text.value = " ";
            bufer.push(list);
            localStorage.setItem("bufer", JSON.stringify(bufer));
            showList();
        } else {
            add_text.classList.add('error_input');
        }
    });
});