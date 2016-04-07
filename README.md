#CSS抛砖引玉之OOCSS+SASS
----------
###为什么用OOCSS？

1. 可重用
2. 易理解

###什么是OOCSS？

1. 结构和皮肤分离
2. 容器和内容分离

####结构和皮肤分离前：

```
#button{
	min-width: 100px;
	height: 50px;
	padding: 5px 10px;
	color: #333;
	border: 1px solid #green;
	background: linkear-gradient(red, blue);
	box-shadow: #ccc 1px 1px 5px;
}

#widget{
	min-width: 100px;
	height: 50px;
	padding: 5px 10px;
	overflow: hidden;
	color: #333;
	border: 1px solid #green;
	background: linkear-gradient(red, blue);
	box-shadow: #ccc 1px 1px 5px;
}
```

####结构和皮肤分离后

```
.button{
	min-width: 100px;
	height: 50px;
	padding: 5px 10px;
}

.widget{
	min-height: 50px;
	padding: 20px;
	overflow: hidden;
}

.skin{
	color: #333;
	border: 1px solid #green;
	background: linkear-gradient(red, blue);
	box-shadow: #ccc 1px 1px 5px;
}
```

####容器和内容分离前：

```
#header h3{
	font-size: 25px;
	line-height: 2;
	margin: 0;
}

#footer h3{
	font-size: 25px;
	line-height: 2;
	margin: 0;
}
```
```
<header id="header">
	<h3>希望的田野上</h3>
</header>

<footer id="footer">
	<h3>开往春天的火车</h3>
</footer>
```

####容器和内容分离后：

```
.title{
	font-size: 25px;
	line-height: 2;
	margin: 0;
}
```
```
<header id="header">
	<h3 class="title">希望的田野上</h3>
</header>

<footer id="footer">
	<h3 class="title">开往春天的火车</h3>
</footer>
```

###OOCSS有点和缺点

####优点
* 重用
* 性能

####缺点
* html维护代价较高


###extend、占位符%、mixin区别

####extend

```
.fl{
	float: left;
}

.pic{
	@extend .fl;
}

/*输出*/
.fl, .pic{
	float: left;
}
```
####占位符%

```
%fl{
	float: left;
}

/*输出*/
.pic{
	@extend %fl;
}

.fl{
	float: left;
}

```

####mixin

```
@mixin skin($color, $bcolor, $bgcolor){
	color: $color;
	border: 1px solid $bcolor;
	background: $bgcolor;
}

.name{
	@include margin(#333, green, #ccc);
}

.pic{
	@include margin(#333, green, #ccc);
}

/*输出*/
.name{
	color: #333;
	border: 1px solid green;
	background: #ccc;
}

.pic{
	color: #333;
	border: 1px solid green;
	background: #ccc;
}
```

###多类和单类

####多类
```
.mt10{
	margin-top: 10px;
}
.pd10{
	padding: 10px;
}

<div class="mt10 pd10">
	小精灵
</div>
```

####单类
```
%mt10{
	margin-top: 10px;
}
%pd10{
	padding: 10px;
}
.name{
	@extend %mt10;
	@extend %pd10;
}

<div class="name">
	小精灵
</div>
```
#####单类小李子
在profile和status中想使用media

* 多类方案：

```
.media{
	overflow: hidden;

  &:first-child{
    float: left;
  }

  &:last-child{
    overflow: hidden;
  }
}

.profile{
	border: 1px solid green;
}

.status{
	border: 2px solid blue;
}

<div class="profile media">
	<div class="pic"></div>
	<div class="info"></div>
</div>

<div class="status media">
	<div class="pic"></div>
	<div class="info"></div>
</div>

```
* 单类方案

```
%media{
	overflow: hidden;

  &:first-child{
    float: left;
  }

  &:last-child{
    overflow: hidden;
  }
}

.profile{
	@extend %media;
	border: 1px solid green;
}

.status{
	@extend %status;
	border: 2px solid blue;
}

<div class="profile">
	<div class="pic"></div>
	<div class="info"></div>
</div>

<div class="status">
	<div class="pic"></div>
	<div class="info"></div>
</div>
```


###举个小李子


media(图片内容两栏布局):

```
<div class="media media-top">
    <div class="media-header media-item">
        <img src="http://localhost:3003/public/images/police.jpg" alt="police" />
    </div>
    <div class="media-body media-item media-item--body">
        <h3 class="media-item-header">且听风吟</h3>
        <p>时光正疯狂，我一路执迷于匆忙</p>
    </div>
</div>


.media{
  display: table;
  width: 100%;

  &-item{
    display: table-cell;

    .media-top & {
      vertical-align: top;
    }

    .media-middle & {
      vertical-align: middle;
    }

    .media-bottom & {
      vertical-align: bottom;
    }

    &-header{
      margin: 0;

      + p{
        margin-top: 20px;
        margin-bottom: 0;
        font-size: 14px;
      }
    }

  }

  &-object{
    display: block;
    max-width: 100px;
  }

  &-body{
    width:20000px;
  }

  &-item + &-item{
    padding-left: 20px;
  }
}


```

















