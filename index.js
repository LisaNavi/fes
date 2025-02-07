let colors = new Array("#ff9900","#6699ff","#66cc33","#ff3300");
let map = document.getElementById("map");
let dis_number = document.getElementById("floorid");
let panel = document.getElementById("information");
let inputbox = document.getElementById("input");
let schedulebox = document.getElementById("cls-table");
let inputS = document.getElementById("input_start");
let inputG = document.getElementById("input_goal");

// クッキーから読み込み
let userdata = {};
if (Cookies.get("data") != undefined)
{
    userdata = JSON.parse(Cookies.get("data"));
}

const now_daystamp = new Date();
now_daystamp.setHours(0);
now_daystamp.setMinutes(0);
now_daystamp.setSeconds(0);
var nowtime = (new Date().valueOf() - now_daystamp[Symbol.toPrimitive]('number'))/1000;
var floornum = 0;
var classtime = 1;
var classday = new Date().getDay();

function floor(num)
{
    floornum = num;
    dis_number.textContent = (num+1) + "F";
    dis_number.style.background=colors[num];
    map.contentWindow.flchange(num);
}

function search(num){
    if (Number.isInteger(num)){
        alert("部屋番号を入力してください。");
    }
    else if (!(num > 100 && num < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(num[0] < 5 && num[0] > 0))
    {
        alert(num[0] + "階は存在しません。");
    }
    else {
        if (typeof data[num] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            map.contentWindow.room = num;
            map.contentWindow.flchange(num-1);
            map.contentWindow.showup(num);
            dis_number.textContent = num[0] + "F";
            dis_number.style.background=colors[num[0] - 1];
            if (data[num][4] != undefined)
                document.getElementById("info-btn").style.display = "inline";
            else
                document.getElementById("info-btn").style.display = "none";
        }
    }
}

function open_route()
{
    var route_pane = document.getElementById("route_panel");
    route_pane.style.visibility = "visible";
    
}

// URLボタン用
function Url(a, needsAuth = false) {
    if (needsAuth) {
        var res = prompt("学校メアド@_____.ed.jpの__を埋めてください");
        console.log(res);
        if (res == "gl.pen-kanagawa") {
            open(a, target="_blank");
        }
    } else {
        open(a, target="_blank");
    }
}

function info(num) {
    var info_pane = document.getElementById("information");
    var desk = document.getElementById("desk");
    var desk_num = document.getElementById("desk-num");
    info_pane.style.visibility = "visible";
    if (data[num][4] != undefined) {
        desk.textContent = data[num][4];
    } else {
        desk.textContent = "この教室のインフォメーションはありません";
    }
}

function info_close() {
    var info_pane = document.getElementById("information");
    info_pane.style.visibility = "hidden";
}


function ResizeFrame() {
    // 画面幅にiframeの幅を合わせる
    let frame = document.getElementById("map");
    let sitewidth = document.documentElement.clientWidth;
    frame.style.width = sitewidth;
}

function Menu_Toggle() {
    let menu_panel = document.getElementById("menu");
    if (menu_panel.style.display == "none") {
        menu_panel.style.display = "flex";
    } else {
        menu_panel.style.display = "none";
    }
}

window.onload = function() {
    ResizeFrame();
}
window.onresize = function() {
    ResizeFrame();
}

panel.addEventListener("click", function() {panel.style.visibility = "hidden";});


//経路検索

function search_route(Snum, Gnum) {
    if (Number.isInteger(Snum)){
        alert("部屋番号を入力してください。");
    }
    else if (!(Snum > 100 && Snum < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(Snum[0] < 5 && Snum[0] > 0))
    {
        alert(Snum[0] + "階は存在しません。");
    }
    else {
        if (typeof data[Snum] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            var Sx = path[Snum][0];
            var Sy = path[Snum][1];
            map.contentWindow.room = Snum;
            map.contentWindow.flchange(Snum-1);
            map.contentWindow.showup(Snum);
            dis_number.textContent = Snum[0] + "F";
            dis_number.style.background=colors[Snum[0] - 1];
        }
    }
    if (Number.isInteger(Gnum)){
        alert("部屋番号を入力してください。");
    }
    else if (!(Gnum > 100 && Gnum < 1000)) {
        alert("3桁である必要があります。");
    }
    else if (!(Gnum[0] < 5 && Gnum[0] > 0))
    {
        alert(Gnum[0] + "階は存在しません。");
    }
    else {
        if (typeof data[Gnum] == "undefined"){
            alert("指定された部屋番号は登録されていません。");
        }
        else {
            var Gx = path[Gnum][0];
            var Gy = path[Gnum][1];
            map.contentWindow.room = Gnum;
            map.contentWindow.flchange(Gnum-1);
            map.contentWindow.showup(Gnum);
            dis_number.textContent = Gnum[0] + "F";
            dis_number.style.background=colors[Gnum[0] - 1];
        }
    }
    map.contentWindow.draw(Sx,Sy,Gx,Gy);
}

