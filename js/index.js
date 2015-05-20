/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-5-5
 * Time: 下午4:45
 * To change this template use File | Settings | File Templates.
 */
var prosess=true;
var SectionChosen=0;
var SectionArray=["index","flexfilm","upper","progrid","midsole","sole","colors","getyours"];
var NavArray=["nav_flexfilm","nav_upper","nav_progrid","nav_midsole","nav_sole","nav_colors","nav_getyours"];
var shoeArray=["shoe_one_part","shoe_two_part","shoe_three_part","shoe_four_part","shoe_five_part","shoe_six_part","shoe_seven_part"];
var allSectionJson={flexfilm:[{top:100,left:100,opacity:100},{top:345,left:903,opacity:100},{top:142,left:1077,opacity:100},{top:202,left:107,opacity:100},{top:398,left:843,opacity:100},{top:162,left:1027,opacity:100},{top:355,left:250,opacity:100},{top:144,left:700,opacity:100}],
    upper:[{top:50,left:50,opacity:100},{top:322,left:143,opacity:100},{top:218,left:1036,opacity:100},{top:60,left:150,opacity:100},{top:408,left:211,opacity:100},{top:248,left:980,opacity:100},{top:438,left:550,opacity:100},{top:432,left:800,opacity:100},{top:148,left:750,opacity:100}],
    progrid:[{top:50,left:50,opacity:100},{top:218,left:1036,opacity:100},{top:90,left:150,opacity:100},{top:248,left:980,opacity:100},{top:438,left:750,opacity:100},{top:432,left:150,opacity:100},{top:148,left:750,opacity:100}],
    midsole:[{top:50,left:50,opacity:100},{top:218,left:1036,opacity:100},{top:100,left:125,opacity:100},{top:248,left:980,opacity:100},{top:438,left:750,opacity:100},{top:432,left:150,opacity:100},{top:148,left:750,opacity:100}],
    sole:[{top:50,left:50,opacity:100},{top:218,left:1036,opacity:100},{top:100,left:125,opacity:100},{top:248,left:980,opacity:100},{top:438,left:750,opacity:100},{top:148,left:750,opacity:100}]
};
/*浏览器的类型*/
var Browser={
    check:function (r){
        return r.test(navigator.userAgent.toLowerCase());
    },
    getBrowserName:function (){
        var browserName;
        var isOpera = this.check(/opera/);
        var isChrome = this.check(/chrome/);
        var isFirefox = this.check(/firefox/);
        var isWebKit = this.check(/webkit/);
        var isSafari = !isChrome && this.check(/safari/);
        var isIE = !isOpera && this.check(/msie/);
        var isIE7 = isIE && this.check(/msie 7/);
        var isIE8 = isIE && this.check(/msie 8/);
        if(isIE)
        {
            browserName = "IE";
        }else if(isChrome)
        {
            browserName = "Chrome";
        }else if(isFirefox)
        {
            browserName = "Firefox";
        }else if(isOpera)
        {
            browserName = "Opera";
        }else if(isWebKit)
        {
            browserName = "WebKit";
        }else if(isSafari)
        {
            browserName = "Safari";
        }else
        {
            browserName = "Others";
        }
        return browserName;
    }
}
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',TurnNext,false);
}
window.onmousewheel=document.onmousewheel=function(){TurnNext(this.event)};

function addOnKeyDownEvent(func){
    var oldOnKeyDown=document.onkeydown;
    if(typeof document.onkeydown!='function'){
        document.onkeydown=func;
    }else{
        oldOnKeyDown();
        func();
    }
}
addOnKeyDownEvent(function(e){TurnNext(e);});
window.onload=function(){
    initObjLoc();
    initSectionHeight();
    for(var Nav_Acount in NavArray){
          var Nav_a = document.getElementById(NavArray[Nav_Acount]);
          var OnClickFunc=function(obj,number){
              obj.onclick=function(){
               //   startMove(NavArray[SectionChosen-1],{color:"#fffff"},6);
                  var oldSectionChosen=SectionChosen;
                  SectionChosen=number;
                  SectionChosen++;
                  TurnNum(oldSectionChosen,SectionChosen);
              }
          }(Nav_a,parseInt(Nav_Acount));
      }
    for(var Section_Acount in SectionArray){
        if(SectionArray[Section_Acount]=="index"||SectionArray[Section_Acount]=="colors"||SectionArray[Section_Acount]=="getyours") continue;
        var Section=document.getElementById(SectionArray[Section_Acount]);
        var OnMouseMove=function(obj){
            obj.onmousemove=function(e){
                e=e||window.event;
                var conImg=getByClass(this,"fContent");
                var speedX =[30,20,20,25,20,20,20,20];
                var speedY =[7,5.5,8,5,6,8,10,12];
                for(var i in conImg){
                    conImg[i].style["left"]=e.screenX/speedX[i]+"px";
                    conImg[i].style["top"] =e.screenY/speedY[i]+"px";
                }
            }
        }(Section);
    }
    var cTipList =getByClass(document,"cTip");
    for(var cTip in cTipList){
        var cTipSpan=getByClass(cTipList[cTip],"cTipText")[0];
        var cTipA=getByClass(cTipList[cTip],"cTipA")[0];
        var Hover=function(HoverObj,MoveObj){
            HoverObj.onmouseover=function(){
                 startMove(MoveObj,{opacity:100},6);
            };
            HoverObj.onmouseout=function(){
                startMove(MoveObj,{opacity:0},6);
            };
        }(cTipA,cTipSpan);
    }
}
function initSectionHeight(){
    var MIN_HEIGHT=600;
    var screenHeight = (Math.ceil(window.innerHeight) > MIN_HEIGHT ? window.innerHeight: MIN_HEIGHT) + 1;
    var setSectionHeight =document.getElementsByTagName("section");
    for(var st in setSectionHeight){
        setStyle(setSectionHeight[st],{height:screenHeight});
    }
}
function TurnNext(e){
    e=e||window.event;
    var TopOrBottom,KeyNum=0;
    //滑轮数据兼容ff
    if(e.wheelDelta){//IE/Opera/Chrome
        TopOrBottom=e.wheelDelta;
    }else if(e.detail){//Firefox
        TopOrBottom=-e.detail;
    }
    if(window.event) // IE
    {
        KeyNum = e.keyCode
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
        KeyNum = e.which
    }
    //阻止滑条滚动默认事件兼容ff ie
    if(KeyNum==40||KeyNum==38||TopOrBottom){
        if (e&&e.preventDefault){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.returnValue=false;
        }
    }
    if(prosess)
    {
        prosess=false;
        var oldSectionChosen=SectionChosen;
        if(TopOrBottom>0||KeyNum==38){
            if(SectionChosen!=0){
                SectionChosen--;
            }
        }
        else if(TopOrBottom<0||KeyNum==40){
            if(SectionChosen!=SectionArray.length-1){
                SectionChosen++;
            }
        }
        if(oldSectionChosen!=SectionChosen)
        {
               TurnNum(oldSectionChosen,SectionChosen);
        }
        else{
            prosess=true;
        }
    }
}
function TurnNum(oldNumber,number){
    startMove(NavArray[oldNumber-1],{color:"#fffff"},6);
    MoveInit(SectionArray[number]);
    if(number>oldNumber){
        if(number>1){
            setStyle(shoeArray[0],{position:"fixed"});
            setStyle(shoeArray[1],{position:"fixed"});
        }
        if(number>2){
            setStyle(shoeArray[2],{position:"fixed"});
            setStyle(shoeArray[3],{position:"fixed"});
        }
        if(number>3) setStyle(shoeArray[4],{position:"fixed"});
        if(number>4){
            setStyle(shoeArray[5],{position:"fixed"});
        }
    }else{
        if(number==4){
          //  shoe_Move_top(function(){

         //   });
        }

    }

    scroller(SectionArray[number],600,function(){
        for(var st in SectionArray){
            var cTipAList=getByClass(document.getElementById(SectionArray[st]),"cTipA");
            if(st==number){
                for(var cTipA in cTipAList){
                    startMove(cTipAList[cTipA],{opacity:100},6);
                }
            }
            else{
                for(var cTipA in cTipAList){
                    startMove(cTipAList[cTipA],{opacity:0},6);
                }
            }
        }
        MoveDes(SectionArray[number]);
        if(number<oldNumber){
            if(number<=1){
                setStyle(shoeArray[0],{position:"absolute"});
                setStyle(shoeArray[1],{position:"absolute"});
            }
            if(number<=2){
                setStyle(shoeArray[2],{position:"absolute"});
                setStyle(shoeArray[3],{position:"absolute"});
            }
            if(number<=3) setStyle(shoeArray[4],{position:"absolute"});
            if(number<=4){
                setStyle(shoeArray[5],{position:"absolute"});
            }
            if(number<=5){
                setStyle(shoeArray[6],{position:"absolute"});
            //    shoe_Move_bottom();

            }

        }
        if(number<5){
            for(var i in shoeArray) setStyle(shoeArray[i],{display:"block"});

        } else{
            for(var i in shoeArray){
                if(i!=shoeArray.length-1) setStyle(shoeArray[i],{display:"none"});
            }
        }
        prosess=true;
    });
    startMove(NavArray[number-1],{color:"#356825"},6);
    if(number>0&&number<6){
        startMove("global_nav",{right:0,opacity:100},6);
    }
    else{
        startMove("global_nav",{right:-149,opacity:0},6);
    }
}
function startMove(obj,json,step,fnEnd){
    if (typeof obj != 'object') {
        obj = document.getElementById(obj);
    }
    if (!obj) return;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true;
        for(var attr in json){
            var cur=0;
            if(attr=='opacity'){
                cur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }
            else if(attr=='color'){
                var begin=getStyle(obj,attr);
                var end =json[attr];
                var beginColor = getRGB(begin);
                var endColor =getRGB(end);
                var rate = getRate(beginColor, endColor);
                beginColor.r = getCur(beginColor.r, endColor.r,rate.r);
                beginColor.g = getCur(beginColor.g, endColor.g,rate.g);
                beginColor.b = getCur(beginColor.b, endColor.b,rate.b);
                cur= getColor(beginColor);
                obj.style.color =cur;
            }
            else{
                cur = parseInt(getStyle(obj,attr));
            }
            var speed=(json[attr]-cur)/step;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(cur!=json[attr]){
                bStop=false;
            }
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else{
                obj.style[attr]=cur+speed+'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd) fnEnd();
        }
    },30);
}
function setStyle(obj,json){
    if (typeof obj != 'object') {
        obj = document.getElementById(obj);
    }
    if (!obj) return;
    for(var attr in json){
        if(attr=='color'){
            obj.style.color =json[attr];
        }
        else if(attr=='opacity'){
            obj.style.filter='alpha(opacity:'+json[attr]+')';
            obj.style.opacity=json[attr]/100;
        }
        else if(attr=='position') {
            obj.style.position=json[attr];
        }
        else if(attr=='display'){
            obj.style.display=json[attr];
        }
        else{
            obj.style[attr]=json[attr]+'px';
        }
    }
}
function getStyle(obj,name)
{
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}
function getByClass(oParent, sClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var re=new RegExp('\\b'+sClass+'\\b', 'i');
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(re.test(aEle[i].className)){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0: v
}
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent

    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    }
}
function getScroll() {
    var t,
        l,
        w,
        h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h
    }
}
function scroller(el,duration,fnEnd) {
    if (typeof el != 'object') {
        el = document.getElementById(el)
    }
    if (!el) return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function() {
        window.clearInterval(z.timer);
        z.timer = null
    };
    z.t = (new Date).getTime();
    z.step = function() {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function() {
                    z.scroll(z.p.y, z.p.x);
                    if(fnEnd) fnEnd();
                },
                13);
        } else {
            st = (( - Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = (( - Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function(t, l) {
        window.scrollTo(l, t);
    };
    z.timer = window.setInterval(function() {
            z.step();
        },
        13);
}
/*
 * 颜色方法
 * */
function getRGB(color) {
    var result;
    var obj=new Object();

    // Look for rgb(num,num,num)
    if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
        obj.r=parseInt(result[1]),obj.g=parseInt(result[2]), obj.b=parseInt(result[3]);

    // Look for rgb(num%,num%,num%)
    else if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
        obj.r=parseFloat(result[1])*2.55,obj.g= parseFloat(result[2])*2.55,obj.b= parseFloat(result[3])*2.55;

    // Look for #a0b1c2
    else if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
        obj.r=parseInt(result[1],16), obj.g=parseInt(result[2],16),obj.b= parseInt(result[3],16);

    // Look for #fff
    else if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
        obj.r=parseInt(result[1]+result[1],16), obj.g=parseInt(result[2]+result[2],16),obj.b= parseInt(result[3]+result[3],16);

    return obj;
}

function getRate(b, e)
{
    var obj = new Object();
    var speed;
    if(Browser.getBrowserName()=="IE"){
        speed=10.1;
    }
    else{
        speed=1.1;
    }
    obj.r = Math.abs(b.r - e.r) / speed;
    obj.g = Math.abs(b.g - e.g) / speed;
    obj.b = Math.abs(b.b - e.b) / speed;
    return obj;
}
function getColor(obj)
{
    obj.r = Math.round(obj.r);
    obj.g = Math.round(obj.g);
    obj.b = Math.round(obj.b);
    var color = '#';
    color += (obj.r < 16 ? '0':'') + obj.r.toString(16);
    color += (obj.g < 16 ? '0':'') + obj.g.toString(16);
    color += (obj.b < 16 ? '0':'') + obj.b.toString(16);
    return color;
}
function getCur(beginValue, endValue, rateValue){
    if(beginValue == endValue){
        return beginValue;
    }

    rateValue = beginValue < endValue ? rateValue : -rateValue;
    beginValue +=rateValue ;
    if(beginValue < Math.min(beginValue, endValue)){
        beginValue = Math.min(beginValue, endValue);
    }
    if(beginValue > Math.max(beginValue, endValue)) {
        beginValue = Math.max(beginValue, endValue);
    }
    return beginValue;
}
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
function MoveInit(objId){
    var obj =document.getElementById(objId);
    if(typeof obj!='object') return;
    var NeedMove=getByClass(obj,"NeedMove");
    var Speed=150;
    var TopValue,LeftValue,OpacityValue=0;
    var newJsonSecOneList={top:TopValue,left:LeftValue,opacity:OpacityValue};
    var oneSectionJson =allSectionJson[objId];
    for(var nd in NeedMove){
        var RandNum=GetRandomNum(0,3);
        switch (RandNum){
            case 0:newJsonSecOneList["top"]=oneSectionJson[nd]["top"]+Speed;
                break;
            case 1:newJsonSecOneList["top"]=oneSectionJson[nd]["top"]-Speed;
                break;
            case 2:newJsonSecOneList["left"]=oneSectionJson[nd]["left"]+Speed;
                break;
            case 3:newJsonSecOneList["left"]=oneSectionJson[nd]["left"]-Speed;
                break;
            default :break;
        }
        setStyle(NeedMove[nd],newJsonSecOneList);
    }
}
function MoveDes(objId){
    var obj =document.getElementById(objId);
    if(typeof obj!='object') return;
    var NeedMove=getByClass(obj,"NeedMove");
    var oneSectionJson =allSectionJson[objId];
    for(var nd in NeedMove){
        startMove(NeedMove[nd],oneSectionJson[nd],6);
    }
}
function initObjLoc(){
    for(var sc in SectionArray){
        var obj =document.getElementById(SectionArray[sc]);
        if(typeof obj!='object') return;
        var NeedMove=getByClass(obj,"NeedMove");
        var oneSectionJson =allSectionJson[SectionArray[sc]];
        for(var nd in NeedMove){
            setStyle(NeedMove[nd],oneSectionJson[nd]);
        }
    }
}

function shoe_Move_bottom(){
    var shoe_seven_part = document.getElementById("shoe_seven_part");
    var shoe = shoe_seven_part.getElementsByTagName("img");
    var i =1;
    var shoe_loop=window.setInterval(function(){
            for(var ii=0;ii<shoe.length;ii++){
                if(ii==i){
                    setStyle(shoe[ii],{display:"block"});
                } else{
                    setStyle(shoe[ii],{display:"none"});
                }
            }
        if(i==shoe.length-1) clearInterval(shoe_loop);
        i++;
    },13);
}
function shoe_Move_top(func){
    var shoe_seven_part = document.getElementById("shoe_seven_part");
    var shoe = shoe_seven_part.getElementsByTagName("img");
    var i =shoe.length;
    var shoe_loop=window.setInterval(function(){
        for(var ii=0;ii<shoe.length;ii++){
            if(ii==i){
                setStyle(shoe[ii],{display:"block"});
            } else{
                setStyle(shoe[ii],{display:"none"});
            }
        }
        if(i==0){
            clearInterval(shoe_loop);
            if(func) func();
        }
        i--;
    },130);
}


