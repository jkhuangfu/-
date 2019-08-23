在写页面的时候很多情况想实现字体两端对齐，如下图：

![](https://upload-images.jianshu.io/upload_images/3074823-d6abcd8c9cf67e0e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
<div class="item">
  <p>
    <span class="label">姓名</span>：
    <span class="value">张三</span>
  </p>
  <p>
    <span class="label">家庭住址</span>：
    <span class="value">北京市朝阳区</span>
  </p>
</div>

.value{
  width:120px;
  color:red;
}
.label{
  display: inline-block;
  height: 100%;
  width: 100px;
  text-align: justify;
  vertical-align: top;
}
.label::after {
  display: inline-block;
  width: 100%;
  content: '';
  height: 0;
}
或
.label{
  display: inline-block;
  height: 100%;
  width: 100px;
  vertical-align: top;
  text-align-last: justify;
}

```
