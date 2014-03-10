<html>
	<head>
		<title>Space Invaders</title>
		<style>
			*
			{
				margin:0px;
			}
		</style>
		<script src="main.js"></script>
		<script>
			String.prototype.removeWord = function(wordRemove) 
			{
				return this.replace(wordRemove,"");
			}
		</script>
	</head>
	<body style="background:#000;">
		<div id="allSource">
			<div id="space" style="width:500px;height:250px;text-align:center;background:#000;">
				<div id="shot" style="position:absolute;display:none;font-weight:bold;color:GREEN;font-size:20px;">|</div>
				<div id="shotAlien" style="z-index:9;position:absolute;display:none;font-weight:bold;color:RED;font-size:20px;width:2px;">|</div>
				<?php
					$xAlien=50;
					$yAlien=20;
					$position="0 -38";
					$className="aliens";
					for($i=1;$i<=55;$i++)
					{
						$xAlien=$xAlien+5+26;
						?>
							<div id="alien<?php echo $i;?>" class="<?php echo $className;?>" style="margin-left:<?php echo $xAlien;?>;margin-top:<?php echo $yAlien;?>;position:absolute;background-position:<?php echo $position;?>;background-image:url(img/invaders.gif);width:26px;height:16px;">
							</div>
						<?php
						if($i%11==0)
						{
							$yAlien=$yAlien+5+16;
							$xAlien=50;
						}
						if($i>=11)
						{
							$position="0 -14";
							$className="aliens1";
						}
						if($i>=33)
						{	
							$position="0 0";
							$className="aliens2";
						}
					}
				?>
				<script>
					var slot=0;
					setInterval(
								function()
								{
									var dom=document.getElementsByClassName('aliens');
									var domOne=document.getElementsByClassName('aliens1');
									var domTwo=document.getElementsByClassName('aliens2');
									if(slot==0)
									{
										for(var i=0;i<domOne.length;i++)
										{
											if(i<dom.length)
												dom[i].style.backgroundPosition='0 -38';
											domOne[i].style.backgroundPosition='0 -14';
											domTwo[i].style.backgroundPosition='0 0';
										}			
										slot=1;
									}	
									else
									{
		
										for(var i=0;i<domOne.length;i++)
										{
											if(i<dom.length)
												dom[i].style.backgroundPosition='-24 -38';
											domOne[i].style.backgroundPosition='-24 -14';
											domTwo[i].style.backgroundPosition='-24 0';
										}	
										slot=0;
									}	
								},	
								1000
							);
					var shotAlien=obj.setObj('shotAlien');
					var speedShotAlien=0;
					var attackControl=500;
					var nAttach;
					function setAlien()
					{
						nAttach=Math.round(Math.random()*55);
						if(obj.setObj('alien'+nAttach) && obj.setObj('alien'+nAttach).style.display!='none')
						{
							xAttach=parseInt(obj.setObj('alien'+nAttach).style.marginLeft.removeWord('px'));
							yAttach=parseInt(obj.setObj('alien'+nAttach).style.marginTop.removeWord('px'));
							shotAlien.style.marginLeft=(xAttach+11);
							shotAlien.style.marginTop=yAttach;
							speedShotAlien=yAttach;
							return nAttach;
						}
						else
							setAlien();
					}
					setAlien();
					var alienAttack=setInterval(
												function()
												{
													if(attackControl==0)
													{
														shotAlien.style.display='';
														if(speedShotAlien>=(400))
														{
															attackControl=500;
															shotAlien.style.display='none';
															setAlien();
														}	
														speedShotAlien=speedShotAlien+5;
														aY=parseInt(400-16);	
										
														rX=parseInt(ship.style.marginLeft.removeWord('px'));
														aX=parseInt(shotAlien.style.marginLeft.removeWord("px"));
						
														rW=parseInt(ship.offsetWidth);
														
														aH=parseInt(ship.offsetHeight);
														if((aX>=rX && aX<=(rX+rW)) && (speedShotAlien>=aY && speedShotAlien<=(aY+aH)))
														{
															clearTimeout(alienAttack);
															ship.style.display='none';
															setTimeout(
																		function()
																		{
																			x=((spaceArea.offsetWidth-ship.offsetWidth)/2);
																			attackControl=500;
																			shotAlien.style.display='none';
																			setAlien();
																			ship.style.display='';
																			ship.style.marginLeft=x+'px';
																		}
																		,
																		1000
																	  );
	
														}
														shotAlien.style.marginTop=speedShotAlien;
	
													}
													else
													{
														attackControl--;
														
													}
												}
												,
												10
											);
	
				</script>
				<table id="area" border="0" cellspacing="0" cellpadding="0" style="border:1px solid GREEN;background:#000;width:500px;height:400px;">
					<tr>
						<td style="color:GREEN;padding-left:5px;" valign="top" >
							<b>
								SCORE:
							</b>
							<span id="score">00</span>
						</td>
					</tr>
					<tr>
						<td valign="bottom">
							<div id="ship" style="width:30px;height:16px">
								<img src="img/ship.gif"/>
							</div>
						</td>
					</tr>
				</table>
				<script>
					var ship=obj.setObj('ship');
					var spaceArea=obj.setObj('area');
					var shot=obj.setObj('shot');
					var alienDie='';
					var x=((spaceArea.offsetWidth-ship.offsetWidth)/2);
					var y=(spaceArea.offsetHeight-(16+24));
					var score=0;
					ship.style.marginLeft=x+'px';
					shot.style.marginTop=y+'px';
					function numberScore()
					{
						var scoreId=obj.setObj('score');
						if(score<54)
						{	
							score++;
							if(score<10)
								score="0"+score;
							scoreId.innerHTML=score;
		
						}
						else if(score>=54)
						{	
							obj.setObj('space').style.paddingTop="150px";
							obj.setObj('space').innerHTML="<span style='color:GREEN;font-size:24px;'><b>Space Invaders</b><br/>Javascript<br/>Pr&oacute;ximos Levels estão em desenvolvimento</span>";
						}	
					}	
					window.onkeydown=function(event)
					{
						var e=event ||  window.event;
						if(e.which==37)
						{
							if(x>0)
							{
								x=x-5;
								ship.style.marginLeft=x+"px";
							}
						}	
						if(e.which==38 && y==(spaceArea.offsetHeight-(16+24)))
						{ 
							shot.style.display='';
							shot.style.marginLeft=(parseInt(ship.style.marginLeft.removeWord("px"))+14)+'px';
							var time=setInterval
							(
								function()
								{
									y=y-5;
									if(y<0)
									{
										shot.style.display='none';
										y=(spaceArea.offsetHeight-(16+24));
										clearTimeout(time);
									}
									for(var die=1;die<=55;die++)
									{
										alienDie=obj.setObj('alien'+die);
	
										aY=parseInt(alienDie.style.marginTop.removeWord("px"));
										
										rX=parseInt(shot.style.marginLeft.removeWord('px'));
										aX=parseInt(alienDie.style.marginLeft.removeWord("px"));
		
										rW=parseInt(shot.offsetWidth);
										aW=parseInt(alienDie.offsetWidth);
										
										rH=parseInt(shot.offsetHeight);
										aH=parseInt(alienDie.offsetHeight);
										
										if((rX+rW>=aX && rX+rW<=aX+aW) && (y+rH>=aY && y+rH<=aY+aH)) 
										{	
											clearTimeout(time);
											shot.style.display='none';
											alienDie.style.display='none';
											alienDie.style.margin='0';
											if(die==nAttach)
												setAlien();
											y=(spaceArea.offsetHeight-(16+24));
											numberScore();
										}
									}
									
									shot.style.marginTop=y+"px";
								} 
								,
								10
							);
						}
						if(e.which==39)
						{
							if(x<(spaceArea.offsetWidth-ship.offsetWidth))
							{
								x=x+5;
								ship.style.marginLeft=x+"px";
							}
						}
					}
				</script>
				<span style="color:#fff">Source: <a href="https://github.com/RenanPalmeira/space" target="_blanck">https://github.com/RenanPalmeira/space</a></span>
			</div>
		</div>
		<script>
			obj.setObj('allSource').style.marginLeft=((window.innerWidth/2)-250);
		</script>
	</body>
</html>