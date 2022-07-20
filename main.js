window.onload = function() {
    document.querySelector('.loader_container').style.display = 'none';
    //document.querySelectorAll('input').forEach(function() {
        //this.checked = false;
    //})
    var loader_per = 0;
    var que_idx = 0;
    var interval;
    var temp1 = temp2 = 0;
    var res_templet = document.querySelector('#final_rs');
    var td = document.querySelectorAll("td");
    var correct_ans_ht = '<span style="color:greenyellow">✓</span>';
    var wrong_ans_ht = '<span style="color:red">✘</span>'
    const que = [
        {
            'q': 'What will be the font size of the "text"?<br> &ltdiv style="font-size:18pt,"&gt<br> &ltp style="font-size:14pt;"&gttext&lt/p&gt <br>&lt/div&gt',
            'option': [
                '14pt',
                '18pt',
                '20pt',
                '40pt'
            ],
            'writer': 'by Ayush',
            'ans': 1
        },
        {
            'q': 'What is DIV ?',
            'option': [
                'Block Element',
                'Inline Element',
                'Inline-block element',
                'None'
            ],
            'writer': 'by XYZ',
            'ans': 1
        },
        {
            'q': 'What does HTML mean ?',
            'option': [
                'Hypotext Markup Language',
                'Hypertext Makeup Language',
                'Hypertext Markup Language',
                'Hyperotext Marku Language'
            ],
            'writer': 'by ABC',
            'ans': 3
        },
        {
            'q': 'what is the output of following code<br>&ltdiv id="sum"&gt3+4&lt/div&gt',
            'option': [
                '37',
                '3+4',
                '3×4',
                '7'
            ],
            'writer': 'by PQR',
            'ans': 2
        },
        {
            'q': 'How many types of heading does an HTML contain?',
            'option': [
                        '4',
                        '5',
                        '3',
                        '6'
                    ],
            'writer': 'by ALPHA',
            'ans': 4
        }
    ];
    var user_ans = [];
    var correct_ans = 0;

    function radio() {
        var radi = document.querySelectorAll('input');
        //console.log(radi[0])
        for (var i = 0; i <= 3; i++) {
            if (radi[i].checked) {
                return i + 1;
            }
        }
    }

    function score() {
        for (var i in user_ans) {
            if (user_ans[i] == que[i].ans) {
                correct_ans++;
                td[(i * 3)].innerHTML = correct_ans_ht;
            }
            else {
                td[(i * 3)].innerHTML = wrong_ans_ht;
            }
        }
    }
    //console.log(radio());
    function load_que(q_no) {
        var question = que[q_no];
        document.querySelector("#que_mn").innerHTML = question.q;
        document.querySelector("#writer").innerHTML = question.writer;
        let lbl = document.querySelectorAll('label');
        lbl[0].innerHTML = question.option[0];
        lbl[1].innerHTML = question.option[1];
        lbl[2].innerHTML = question.option[2];
        lbl[3].innerHTML = question.option[3];

    }
    load_que(que_idx);

    function loader() {
        document.querySelector('#bar').style.width = 100 - (loader_per / 10) + '%';
        loader_per++;
        if (loader_per / 10 == 100) {
            loader_per = 0;
            que_idx++;
            if (que_idx < que.length) {
                user_ans.push(undefined);
                load_que(que_idx);
                clearInterval(interval);
                restart_interval('TIME OUT!');
                document.querySelector('#abc').innerHTML = (temp1)+' : '+(++temp2);
            }
            else {
                clearInterval(interval);
                user_ans.push(undefined);
                if (document.querySelector('#final_rs').style.display != 'block') {
                    restart_interval('TIME OUT!');
                    score();
                    document.querySelector('#abc').innerHTML = (temp1)+' : '+(++temp2);
                }
                //console.log(user_ans);
                document.querySelector('#xp_count').innerHTML = correct_ans * 2 + ' XP';
                if (correct_ans == que.length) {
                    document.querySelector("#result_word").innerHTML = 'DRAW';
                    document.querySelector("#result_word").style.backgroundColor = 'gray';
                    document.querySelector('#result_xp').innerHTML = (correct_ans * 2) + 32 + ' XP';
                    document.querySelector('#cp__a').innerHTML = '32 XP';
                } else {
                    document.querySelector("#result_word").innerHTML = 'YOU LOST';
                    document.querySelector("#result_word").style.backgroundColor = 'red';
                    document.querySelector('#result_xp').innerHTML = (correct_ans * 2) + 10 + ' XP';
                    document.querySelector('#cp__a').innerHTML = '10 XP'
                }
                document.querySelector('#win_ratio').innerHTML = correct_ans + ' : 5';
                res_templet.style.display = 'block';
            }
        }
        //console.log(loader_per)
    }
    var temp_var = 1;

    function interval_set() {
        interval = setInterval(loader, 20);
        document.querySelector('#correct_wrong_time').style.display = 'none';
    }

    function restart_interval(txt) {
        setTimeout(interval_set, 2000);
        document.querySelector('#correct_wrong_time').style.display = 'block';
        /**/
        document.querySelector(".text_show_on").innerHTML = txt;
        if (txt == 'Correct!') {
            document.querySelector(".text_show_on").style.color = '#70a63c';
        }
        else {
            document.querySelector(".text_show_on").style.color = '#E83434';
        }
    }
    document.querySelector("#accept").addEventListener('click', function() {
        interval_set();
        document.querySelector("#yes_no").style.display = 'none';
    });
    document.querySelector("#decline").addEventListener('click', function() {
        alert('😮🙆‍♂️ Oh no my freind please see it.')
    });
    document.querySelector('#btn_done').addEventListener('click', function() {
        loader_per = 0;
        que_idx++;
        if (que_idx < que.length) {
            loader();
            user_ans.push(radio());
            load_que(que_idx);
            clearInterval(interval);
            if (radio() == que[que_idx - 1].ans) {
                restart_interval('Correct!');
                document.querySelector('#abc').innerHTML = (++temp1)+' : '+(++temp2);
                document.querySelectorAll('input').forEach(
                    function(f){
                        f.checked = false;
                });
            }
            else {
                restart_interval('Wrong!');
                document.querySelector('#abc').innerHTML = (temp1)+' : '+(++temp2);
                document.querySelectorAll('input').forEach(
                    function(f){
                        f.checked = false;
                });
            }
        }
        else {
            if (temp_var) {
                clearInterval(interval);
                if (radio() == que[que_idx - 1].ans) {
                    restart_interval('Correct!');
                    document.querySelector('#abc').innerHTML = (++temp1)+' : '+(++temp2);
                }
                else {
                    restart_interval('Wrong!');
                    document.querySelector('#abc').innerHTML = (temp1)+' : '+(++temp2);
                }
                user_ans.push(radio());
                temp_var = 0;
                //clearInterval(interval);
                score();
                //console.log('correct ans : '+correct_ans);
                document.querySelector('#xp_count').innerHTML = correct_ans * 2 + ' XP';
                if (correct_ans == que.length) {
                    document.querySelector("#result_word").innerHTML = 'DRAW';
                    document.querySelector("#result_word").style.backgroundColor = 'gray';
                    document.querySelector('#result_xp').innerHTML = (correct_ans * 2) + 32 + ' XP';
                    document.querySelector('#cp__a').innerHTML = '32 XP';
                } else {
                    document.querySelector("#result_word").innerHTML = 'YOU LOST';
                    document.querySelector("#result_word").style.backgroundColor = 'red';
                    document.querySelector('#result_xp').innerHTML = (correct_ans * 2) + 10 + ' XP';
                    document.querySelector('#cp__a').innerHTML = '10 XP';
                }
                document.querySelector('#win_ratio').innerHTML = correct_ans + ' : 5';
                res_templet.style.display = 'block';
            }
            else {
                clearInterval(interval);
            }
            //console.log(user_ans)
        }
    });
}
