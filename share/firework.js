/*
 * File: firework.js                                                           *
 * Project: qy-mind-autumn-festival-fireworks                                  *
 * Created Date: 2022-09-10 18:07:48                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-10 18:07:48                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */
import { Tool } from './tool';
import { FireWorkParticle } from './firework-particle'

//--------------------烟花类----------------------
//烟花类 包含烟花的一些详细信息
const Firework = function (fwX, fwY, fwR, fwColor, area, fwFigure) {// //烟花对象  x轴上的坐标 Y轴上的坐标 烟花半径 烟花颜色 烟花范围 烟花形状 画笔

    //创建一个私有的工具
    var tool = new Tool();

    //----------------------------属性-------------------------------

    //保存烟花片段集合
    this.fireWorkParticles = [];
    //烟花坐标
    this.fireworkX = fwX;
    this.fireworkY = fwY + fwR;
    //烟花的半径
    this.fireworkRadius = fwR;
    //烟花的颜色
    this.fireworkColor = fwColor;
    //烟花的范围
    this.fireworkArea = area;
    //特殊的烟花形状 如果没有特殊形状则默认值为false
    this.fireworkFigure = fwFigure || false;
    //烟花是否已经爆炸
    this.blast = false;
    //烟花爆炸的范围
    this.explosionRange = tool.coustomRandom(52, 200);//.random(100);

    //---------------------------------------------------------------

    //显示烟花
    this.show = function () {
        //保存当前画笔的状态
        Tool.outerPen.save();
        //开始路径
        Tool.outerPen.beginPath();
        //开始画圆  x坐标 y坐标   员半径  开始半径  结束半径
        Tool.outerPen.arc(this.fireworkX, this.fireworkY, this.fireworkRadius, 0, 2 * Math.PI);
        //画笔颜色
        Tool.outerPen.fillStyle = this.fireworkColor;
        //开始填充
        Tool.outerPen.fill();
        //回到保存画笔状态前
        Tool.outerPen.restore();
    }

    //移动烟花
    this.move = function () {

        //设置可移动的范围   也就是 指定范围内距离当前坐标的位置
        var moveRangeX = this.fireworkArea.x - this.fireworkX, moveRangeY = this.fireworkArea.y - this.fireworkY;
        //改变当前x轴的坐标及y轴的坐标  //以范围的百分之一开始递增
        this.fireworkX = this.fireworkX + moveRangeX * 0.01;
        this.fireworkY = this.fireworkY + moveRangeY * 0.01;

        //判断当前 移动范围的绝对值 是否小于 80-200 
        if (Math.abs(moveRangeX) <= this.explosionRange && Math.abs(moveRangeY) <= this.explosionRange) {
            //判断当前形状是否定义
            if (this.fireworkFigure) {
                //画带有形状的烟花片段
                this.showFigureFireWorkParticle();
            }
            //画普通烟花片段
            else { this.showFireWorkParticle(); }

            //设置烟花已经爆炸
            this.blast = true;
        }
        else {
            //显示烟花
            this.show();
        }
    }

    //烟花 外面一层光晕  就是光圈
    this.aperture = function () {

        //保留当前画笔状态
        Tool.outerPen.save();
        //设置画笔的颜色
        Tool.outerPen.fillStyle = tool.coustomRgbaColor(0, 255, 0.3);
        //开始路径
        Tool.outerPen.beginPath();
        //开始画圆
        Tool.outerPen.arc(this.fireworkX, this.fireworkY, this.fireworkRadius + tool.coustomRandomNotInt(1, 2), 0, 2 * Math.PI);
        //开始填充
        Tool.outerPen.fill();
        //返回之前画笔状态
        Tool.outerPen.restore();


    }

    //显示烟花片段
    this.showFireWorkParticle = function () {

        //定义一个烟花片段数目
        var fwpNum = tool.coustomRandom(120, 214);
        //烟花风格 两种风格  1 和 2   第一种风格是  同色烟花  第二种的彩色烟花  
        var style = tool.coustomRandom(0, 10) >= 5 ? 1 : 2;
        //颜色
        var color;
        //判断风格是不是第一种
        if (style === 1) {
            //定义颜色
            color = {
                red: tool.coustomRandom(0, 255),
                green: tool.coustomRandom(0, 255),
                blue: tool.coustomRandom(0, 255),
                alpha: 1// tool.random(1)
            }
        }

        //定义一个范围  
        var area = tool.coustomRandom(250, 360);
        //循环制造烟花片段
        for (var i = 0; i < fwpNum; i++) {
            //如果是风格2的话
            if (style === 2) {
                //定义每一个烟花片段的颜色  也就是彩色烟花
                color = {
                    red: tool.coustomRandom(0, 255),
                    green: tool.coustomRandom(0, 255),
                    blue: tool.coustomRandom(0, 255),
                    alpha: 1//tool.random(1)
                }
            }

            //定义一个角度
            var angle = tool.coustomRandomNotInt(-Math.PI, Math.PI);
            //获取一个新的x轴上的坐标值
            var areaX = tool.coustomRandomNotInt(0, area) * Math.cos(angle) + this.fireworkX;
            //获取一个新的y轴上的坐标值
            var areaY = tool.coustomRandomNotInt(0, area) * Math.sin(angle) + this.fireworkY;
            //获取一个半径
            var radius = tool.coustomRandomNotInt(2, 3);
            //创建一个烟花片段
            var fireWorkParticle = new FireWorkParticle(this.fireworkX, this.fireworkY, radius, color, areaX, areaY);
            //将当前烟花片段添加进烟花集合中
            this.fireWorkParticles.push(fireWorkParticle);
        }

    }

    //显示特殊的烟花片段
    this.showFigureFireWorkParticle = function () {

        let color = '';
        //定义当前特殊烟花片段对象
        var that = this;

        //先画再捕捉像素点然后绘制特殊烟花片段
        this.drawCatchDrawVip(Tool.innerCanvas, Tool.innerPen, this.fireworkFigure, 5, function (pixels) {
            //x轴的移动范围
            var areaX = Tool.innerCanvas.width / 2 - that.fireworkX;
            //y轴的移动范围
            var areaY = Tool.innerCanvas.height / 2 - that.fireworkY;
            //循环遍历所有 点 的集合
            for (var i = 0; i < pixels.length; i++) {
                //获取颜色   为每个点的颜色
                color = { red: pixels[i].red, green: pixels[i].green, blue: pixels[i].blue, alpha: pixels[i].alpha };
                //获取每个点的x轴坐标
                var pixelX = pixels[i].x;
                //获取每个点的y轴的坐标
                var pixelY = pixels[i].y;
                //获得半径
                var radius = tool.coustomRandomNotInt(1, 2);
                //创建烟花片段    当前点的x y 轴坐标值  半径   颜色   减去点与点之间的距离
                var fireWorkParticle = new FireWorkParticle(that.fireworkX, that.fireworkY, radius, color, pixelX - areaX, pixelY - areaY);
                //保存烟花片段
                that.fireWorkParticles.push(fireWorkParticle);
            }
        });
    }

    //-------------------------------私有的方法----------------------------------

    //先画再捕捉像素点然后绘制特殊烟花片段  隐藏的画布对象  隐藏的画笔对象 特殊的烟花形状元素对象  点的半径 回调函数
    this.drawCatchDrawVip = function (canvas, context, fireworkFigure, pixelRadius, callback) {
        let pixels;
        //清除画布2所有的痕迹
        context.clearRect(0, 0, canvas.width, canvas.height);
        //创建图片对象
        // var img = new Image();
        //判断当前形状元素对象中是否有 img标签
        // if (fireworkFigure.innerHTML.indexOf("img") >= 0) {
        //     //如果有的话就保存到 已经创建好的图片对象中
        //     img.src = fireworkFigure.getElementsByTagName("img")[0].src;

        //     //图片加载    当前这个
        //     imgload(img, function () {
        //         //画笔2 画图片    图片对象          中心点 减去 图片中心点    在画布2中居中  提示 画布2是自己创建的   
        //         context.drawImage(this, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.width / 2);
        //         pixels = getimgData(canvas, context, pixelRadius);
        //         //将像素点集合转换成烟花片段集合 并保存
        //         callback(pixels);
        //     })
        // }
        // else {//如果没有 img标签 
            //获取形状元素对象中的文本
            var text = fireworkFigure.innerHTML;
            //画笔2保存当前状态
            context.save();
            //设置字体大小
            var fontSize = 160;
            //设置画笔的字体
            context.font = fontSize + "px 微软雅黑 bold";
            //设置画笔的文本水平对齐方式
            context.textAlign = "center";
            //设置画笔的文本垂直对齐方式
            context.textBaseline = "middle";
            //-------------------------------------------------------------------------------------
            //// 创建一个渐变
            //var gradient = ctx.createLinearGradient(0, 0, 1050, 0);
            //gradient.addColorStop("0", "magenta");
            //gradient.addColorStop("0.5", "blue");
            //gradient.addColorStop("1.0", "red");
            //// 填充一个渐变
            //context.fillStyle = gradient;
            //--------------------------------------------------------------------------------------

            ////设置填充的风格
            context.fillStyle = tool.coustomRgbaColor(128, 255, 1);//,"rgba(" + tool.coustomRandom(128,255) + "," + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + " , 1)";
            //填充文本      在画布上居中
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            //画笔2回到保存前的状态
            context.restore();
            //获取文字的像素点集合
            pixels = getimgData(canvas, context, pixelRadius);
            //将像素点集合转换成烟花片段
            callback(pixels);
        // }
    }


    //开始在画布上画    //隐藏的画布对象    //隐藏的画笔对象   点与点之间的距离
    function getimgData(canvas, context, pixelRadius) {

        //获取画布上的所有的像素点
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        //清除画布上所有的像素点
        context.clearRect(0, 0, canvas.width, canvas.height);
        //像素点集合
        var pixels = [];

        //下面两个for循环 相当于 扫描整张画笔 读取所有的点 获取所有的点的信息  x轴坐标、y轴坐标、以及 rgb颜色的颜色值
        // TODO 大量的运算会导致页面卡顿，可以用多线程来处理
        //开始循环    循环遍历  先循环画布的宽度  增量是点与点之间的距离
        for (var x = 0; x < imgData.width; x += pixelRadius) {
            //开始循环   循环遍历  然后循环画布的高度  增量式点与点之间的距离
            for (var y = 0; y < imgData.height; y += pixelRadius) {
                //这是获取当前某个像素点中的百万像素的颜色索引值
                var i = (y * imgData.width + x) * 4;
                //只有符合某种特殊情况下
                if (imgData.data[i + 4] > 128) {
                    //才获取这个点
                    var pixel = { x: x, y: y, red: imgData.data[i], green: imgData.data[i + 1], blue: imgData.data[i + 2], alpha: tool.random(1) };
                    //然后将这个点加到像素点集合中
                    pixels.push(pixel);
                }
            }
        }
        //返回像素点集合
        return pixels;
    }

    //加载图片的方法 并进行继承 
    function imgload(img, callback) {

        //如果当前图片对象已经完成
        if (img.complete) {
            //就让当前图片对象继承自 这个回掉函数对象   
            //也就是在回掉函数中可以使用 this关键字来代替 img对象
            //而img对象可以直接调用回掉函数中的 属性 及方法
            callback.call(img);
        }
        else {//反之
            //图片在加载完毕之后的时候
            img.onload = function () {
                //就让当前图片对象继承自 这个回掉函数对象   
                //也就是在回掉函数中可以使用 this关键字来代替 img对象
                //而img对象可以直接调用回掉函数中的 属性 及方法
                callback.call(img);
            }
        }
    }
}
//烟花类扩展
Firework.prototype = {};

export { Firework };
