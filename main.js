var timeMaster;
var slotSlide=1;
var x,y;
var xResize,yResize;
var cSize=false;
var objDrop;
var objReSize;
var isMove=false;
var blockMove=false;
var ajaxStatus=true;
var obj={
	setObj:function(obj)
	{
		var id;
		if(document.getElementById(obj))
			id=document.getElementById(obj);
		else if(document.getElementsByClassName(obj))
			id=document.getElementsByClassName(obj).item(0);
		else 
			id=null;
		return id;
	},

};

var bug={
	init:function(txt)
	{
		objBug=obj.setObj('bug');
		if(txt!=null)
			objBug.innerHTML=txt;
	}
};

var ajax={
	exeJS:function(txt)
	{
		var ini=0;
		while(ini!=-1)
		{
			ini=txt.indexOf('<script',ini);
			if(ini>=0)
			{
				ini=txt.indexOf('>',ini)+1;
				var fim = txt.indexOf('</script>',ini);
				codigo=txt.substring(ini,fim);
				var head=document.getElementsByTagName('head').item(0);
				var eScript=document.createElement('script');
				eScript.setAttribute('type','text/javascript'); 
				eScript.setAttribute('charset','utf-8');
				eScript.text=codigo;
				head.appendChild(eScript);
			}
		}
	},
	init:function(link,place)
	{
		var http;
		if(place==null || place=='')
			place='iframe';
		if(window.XMLHttpRequest)
			http=new XMLHttpRequest();
		else
			http=new ActiveXObject("Microsoft.XMLHTTP");
		http.onreadystatechange=function()
		{
			if(http.readyState==4)
			{
				if(http.status==200)
				{
					var texto=http.responseText;
					var objAjax=obj.setObj(place);
					if(objAjax)
					{
						if(ajaxStatus)
							ajaxStatus=link;
						objAjax.innerHTML=texto;
						ajax.exeJS(texto);
					}
				}
				else if(http.status==400)
					bug.init('Erro ao carregar');	
				else if(http.status==403)
					bug.init('Erro interno e desconhecido do servidor');	
				else if(http.status==404)
					bug.init('Pagina nao encontrada');
				else if(http.status==408)
					bug.init('dessa vez tb nao foi');
				else if(http.status==500)
					bug.init('Erro geral do servidor, esse erro gera quando da erro no php por exemplo');
				else if(http.status==503)
					bug.init('Site esta baleiando tem muita gente acessando');
			}
		}
		http.open("POST",link,true);
		http.send();			
	}
};

var dragdrop={
		ddMove:function(e)
		{
			if (isMove)
			{
				if(blockMove==false)
				{
					moveX=objDrop ? tx + e.clientX - x : tx + event.clientX - x;
			    	moveY=objDrop ? ty + e.clientY - y : ty + event.clientY - y;
					if(moveX<=(window.innerWidth-objDrop.offsetWidth) && moveX>=0)
			    		objDrop.style.marginLeft=moveX;
			    	if(moveY<=(window.innerHeight-objDrop.offsetHeight) && moveY>=0)
			    		objDrop.style.marginTop=moveY;
					return false;
				}
				else if(blockMove=='x')
				{
					moveX=objDrop ? tx + e.clientX - x : tx + event.clientX - x;
			    	if(moveX<=(window.innerWidth-objDrop.offsetWidth) && moveX>=0)
			    		objDrop.style.marginLeft=moveX;
			    	return false;
				}
				else if(blockMove=='y')
				{
					moveY=objDrop ? ty + e.clientY - y : ty + event.clientY - y;
					if(moveY<=(window.innerHeight-objDrop.offsetHeight) && moveY>=0)
			    		objDrop.style.marginTop=moveY;
					return false;
				}							
		  	}
		},
		ddSelect:function(e)
		{
			if(isMove)
			{
				objDrop=objDrop ? objDrop : document.getElementById(nameObj); 
				tx = parseInt(objDrop.style.marginLeft+0);
			    ty = parseInt(objDrop.style.marginTop+0);
			    x = objDrop ? e.clientX : event.clientX;
			    y = objDrop ? e.clientY : event.clientY;
			    document.onmousemove=dragdrop.ddMove;
			    return false;
			}
		},
		init:function(event,id)
		{
			if(isMove==true)
			{
				document.onmousedown=dragdrop.ddSelect;
				document.onmouseup=new Function("isMove=false;dragdrop.init()");
				objDrop=obj.setObj(id);
				this.ddSelect(event);
			}
			else
			{
				document.onmousedown=void(0);
				document.onmouseup=new Function("void(0)");
			}	
		}
};

var resize={
		sizeMove:function(e)
		{
			if (cSize)
			{
				//if(blockMove==false)
				//{
					resizeX=objReSize ? txResize + e.clientX - xResize : txResize + event.clientX - xResize;
					resizeY=objReSize ? tyResize + e.clientY - yResize : tyResize + event.clientY - yResize;
					if(resizeX<=(window.innerWidth) && resizeX>=0)
						objReSize.style.width=resizeX;
			    	if(resizeY<=(window.innerHeight) && resizeY>=0)
			    		objReSize.style.height=resizeY;
					return false;
				/*}
				else if(blockMove=='x')
				{
					moveX=objDrop ? tx + e.clientX - x : tx + event.clientX - x;
			    	if(moveX<=(window.innerWidth-objDrop.offsetWidth) && moveX>=0)
			    		objDrop.style.marginLeft=moveX;
			    	return false;
				}
				else if(blockMove=='y')
				{
					moveY=objDrop ? ty + e.clientY - y : ty + event.clientY - y;
					if(moveY<=(window.innerHeight-objDrop.offsetHeight) && moveY>=0)
			    		objDrop.style.marginTop=moveY;
					return false;
				}*/							
		  	}
		},
		sizeSelect:function(e)
		{
			if(cSize)
			{
				objReSize=objReSize ? objReSize : document.getElementById(nameReSize); 
				txResize = parseInt(objReSize.style.width+0);
			    tyResize = parseInt(objReSize.style.height+0);
			    xResize = objReSize ? e.clientX : event.clientX;
			    yResize = objReSize ? e.clientY : event.clientY;
			    document.onmousemove=resize.sizeMove;
			    return false;
			}
		},
		init:function(event,id)
		{
			if(cSize==true)
			{
				document.onmousedown=resize.sizeSelect;
				document.onmouseup=new Function("cSize=false;resize.init()");
				objReSize=obj.setObj(id);
				this.sizeSelect(event);
			}
			else
			{
				document.onmousedown=void(0);
				document.onmouseup=new Function("void(0)");
			}	
		}
};

function popup(cmd)
{
	var shadow=obj.setObj('shadow');
	var popup=obj.setObj('popup');
	if(cmd=='open')
		shadow.style.display='';
	else
		shadow.style.display='none';
}
function reload(page,id)
{
	ajax.init(page,id);
	clearTimeout(timeMaster);
	timeMaster=setTimeout("reload('"+page+"','"+id+"')", 8000);
}

String.prototype.uppWord = function() 
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function slide(palco,cmd,cordOne,cordTwo,shadow)
{
	var slideObj=obj.setObj(palco);
	if(slideObj)
	{
		if(cordOne instanceof Array)
		{
			if(slotSlide<(cordOne.length-1))
			{	
				slotSlide++;
				slideObj.style.backgroundImage='url('+cordOne[slotSlide]+')';
			}
			else
				slotSlide=1;				
		}
		console.log(slotSlide+' '+cordOne[slotSlide]);
	}
}

function setCookie(name,value,expire)
{
	if(name && value)
	{
		value=escape(value);
		if(expire)
		{
			var date = new Date();
		    date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
		    var expires = "; expires=" + date.toGMTString();
			document.cookie=name+'='+value+expires;
		}
		else
			document.cookie=name+'='+value;
	}
}

function getCookie(name)
{
	if(name)
	{
		var value = document.cookie;
		var start = value.indexOf(" "+name+"="); 
		if(start==-1)
			start=value.indexOf(name+"=");
		if(start==-1)
			value=null;
		else
		{
			start=(value.indexOf("=",start)+1);
			var end=value.indexOf(";",start);
			if(end==-1)
			{
				end=value.length;
			}
			value=unescape(value.substring(start,end));
		}
		return value;
	}
}

function deleteCookie(name)
{
	if(getCookie(name))
		document.cookie=name+"=42; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
var properties={
		status:'off',
		install:function()
		{
			window.onmousedown=function(event)
			{
				if(event.button==2)
				{
					properties.init('open');
					window.oncontextmenu =new Function("return false");
				}
				if(event.button==0 && properties.status=='off')
				{
					properties.init();
					window.oncontextmenu=new Function("return false");
				}
				console.log(properties.status);
			}
			window.onkeydown=function(event)
			{
				if(event.which==27 && properties.status=='off')
				{
					properties.init();
					window.oncontextmenu=new Function("return false");
				}
			}
		},
		remove:function()
		{
			window.onmousedown=function(event)
			{
				void(0);
				window.oncontextmenu =new Function("return true");
			}
			window.onkeydown=function(event)
			{
				void(0);
				window.oncontextmenu =new Function("return true");
			}
		},
		init:function(cmd)
		{
			var id=obj.setObj('properties');
			if(cmd=='open')
			{
				this.status='on';
				x=event.clientX;
				y=event.clientY;
				id.style.marginLeft=x+'px';
				id.style.marginTop=y+'px';
				id.style.display='';
			}
			else
			{
				this.status='off';
				id.style.display='none';
			}
		}
	}; 