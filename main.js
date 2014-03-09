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