/*
 * File: night-sky.js                                                          *
 * Project: qy-mind-autumn-festival-fireworks                                  *
 * Created Date: 2022-09-10 18:11:04                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-10 18:11:04                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import { Tool, raf } from './tool';
import { Star } from './star';
import { Firework } from './firework'

//--------------------夜空类----------------------
//夜空类 包含夜空的一些详细信息
var NightSky = function () {

    //------------------私有的-------------------------
    //创建一个工具
    var tool = new Tool();

    //-----------------------属性--------------------------

    //存放夜空中所有的星星
    var Stars = [];

    //存放夜晚所有的烟花集合
    var fireworks = [];

    //过去的时间
    let oldTime;
    //-----------------------------------------------------------

    //画星星
    this.drawStarSky = function () {
        //循环画星星
        for (var i = 0; i < 334; i++) {
            //半径
            var starR = tool.random(1);
            //x坐标值
            var starX = tool.random(Tool.outerCanvas.width);
            //y轴坐标值
            var starY = tool.random(2 * Tool.outerCanvas.height) - Tool.outerCanvas.height;
            //创建星星对象
            var star = new Star(starX, starY, starR);
            //添加星星到集合中
            Stars.push(star);
            //显示星星
            star.Show();
        }

    }

    //画月亮
    this.drawMoon = function drawMoon() {
        //获取月亮对象
        var moon = document.getElementById("moon");
        //月亮坐标  X轴坐标               Y轴坐标        大小  月亮是正方形的
        var centerX = Tool.outerCanvas.width - 200, centerY = 100, size = 80;
        //图片是否已经加载完毕
        if (moon.complete) {
            //直接画月亮
            Tool.outerPen.drawImage(moon, centerX, centerY, size, size);
        }
        else {
            //在图片加载时
            moon.onload = function () {
                //直接画月亮
                Tool.outerPen.drawImage(moon, centerX, centerY, size, size);
            }
        }
        //创建一个月亮光晕的增量
        var value = 0;
        //开始循环
        for (var i = 0; i < 10; i++) {
            //保存画笔当前状态
            Tool.outerPen.save();
            //开始路径
            Tool.outerPen.beginPath();
            //开始画圆
            Tool.outerPen.arc(centerX + size / 2, centerY + size / 2, size / 2 + value, 0, 2 * Math.PI);
            //设置填充的颜色    这个测试后最好看的颜色
            Tool.outerPen.fillStyle = "rgba(240,219,120,0.005)";
            //索引值加2
            value += 2;
            //填充
            Tool.outerPen.fill();
            //返回画笔保存的状态
            Tool.outerPen.restore();
        }

    }

    //动态的执行动画
    this.dynamicAnimate = function dynamicAnimate() {
        //保存已经设置的画笔状态
        Tool.outerPen.save();
        //填充风格
        // Tool.outerPen.fillStyle = "rgba(0,5,24,0.1)";
        Tool.outerPen.fillStyle = `rgba(0,0,0, 0.05)`;
        //填充矩形
        Tool.outerPen.fillRect(0, 0, Tool.outerCanvas.width, Tool.outerCanvas.height);
        //返回上一个画笔的状态
        Tool.outerPen.restore();
        //获取新时间
        var newTime = new Date();
        //判断新时间是否比老时间多500多毫秒
        if (newTime - oldTime > 520) {
            //判断随机数*100是否大于2
            var lucky = tool.random(100) > 10 ? true : false;
            //获取一个在当前画布宽度 五分之一到五分之四间的一个值 作为 x轴上的坐标值
            var x = tool.coustomRandomNotInt(Tool.outerCanvas.width / 5, Tool.outerCanvas.width * 4 / 5);
            //获取 50：200之间的值作为 y轴上的坐标值
            var y = tool.coustomRandomNotInt(50, 200);
            //判断幸运是否降临
            if (lucky) {
                //创建一个烟花               x轴的位置  画布三分之一到三分值二的地方       半径  颜色       范围
                var firework = new Firework(tool.coustomRandomNotInt(Tool.outerCanvas.width / 3, Tool.outerCanvas.width * 2 / 3), Tool.outerCanvas.height, tool.coustomRandomNotInt(2, 5), tool.coustomRgbaColor(0, 255, 1), { x: x, y: y }
                    // , document.querySelectorAll(".shape")[tool.coustomRandom(0, document.querySelectorAll(".shape").length)]
                    //   , document.querySelectorAll(".shape")[tool.AutoSortShapeIndex()]
                    // ,document.querySelectorAll(".shape")[0]
                );               //添加烟花
                fireworks.push(firework)
            }
            else {//幸运没有降临
                //创建一个烟花            x轴的位置   画布三分之到三分之二的地方           半径   颜色   范围   
                var firework = new Firework(tool.coustomRandomNotInt(Tool.outerCanvas.width / 3, Tool.outerCanvas.width * 2 / 3), Tool.outerCanvas.height, tool.coustomRandomNotInt(2, 5), tool.coustomRgbaColor(0, 255, 1), { x: Tool.outerCanvas.width / 2, y: 200 },
                    //特殊烟花的形状   获取所有.shape的div中随机的一个div
                    document.querySelectorAll(".shape")[tool.AutoSortShapeIndex()]
                );
                //添加烟花
                fireworks.push(firework)
            }
            //把上一次的时间作为老时间
            oldTime = newTime;

            //浏览器控制台输出这个集合
            //console.log(fireworks)
        }

        //星星集合遍历
        Stars.foreach(function () {
            //大印星星
            this.Show()
        });

        //画月亮
        this.drawMoon();

        //大烟花集合遍历
        fireworks.foreach(function (index) {

            //获取当前的大烟花对象
            var that = this;
            //判断当前大烟花是否没有死去
            if (!this.blast) {
                //烟花移动
                this.move();
                //开始画烟花的光晕
                this.aperture();
            }
            else {

                ////遍历大烟花中的小烟花集合
                this.fireWorkParticles.foreach(function (index) {
                    //判断当前小烟花有没有死去
                    if (!this.blast) {
                        //烟花片段移动
                        this.move(index);
                    }
                    //如果当前烟花已经放完
                    else if (index === that.fireWorkParticles.length - 1) {
                        fireworks[fireworks.indexOf(that)] = null;
                    }
                });
            }
        });

        //定时触发
        raf(() => this.dynamicAnimate());

    }

    //-----------------------------------------------------------

    this.init = function init() {
        // 工具的静态方法也初始化一下
        Tool.init();
        //给当前画布增加一个单击事件
        Tool.outerCanvas.onclick = function () {
            //当前鼠标点击的位置 坐标值
            var x = event.clientX;
            var y = event.clientY;
            //创建烟花
            var firework = new Firework(tool.coustomRandomNotInt(Tool.outerCanvas.width / 3, Tool.outerCanvas.width * 2 / 3), Tool.outerCanvas.height, tool.coustomRandomNotInt(1, 3), tool.coustomRgbaColor(0, 255, 1), { x: x, y: y },  //特殊烟花的形状   获取所有.shape的div中随机的一个div
                document.querySelectorAll(".shape")[tool.AutoSortShapeIndex()]);
            //将这个烟花添加到烟花集合中
            fireworks.push(firework)

        }

        //画星星
        this.drawStarSky();
        //保存一下旧时间
        oldTime = new Date();
        //执行动画
        this.dynamicAnimate();
        setInterval(() => {
            //保存已经设置的画笔状态
            Tool.outerPen.save();
            //填充风格
            // Tool.outerPen.fillStyle = "rgba(0,5,24,0.1)";
            Tool.outerPen.fillStyle = `rgba(0,0,0, 1)`;
            //填充矩形
            Tool.outerPen.fillRect(0, 0, Tool.outerCanvas.width, Tool.outerCanvas.height);
            //返回上一个画笔的状态
            Tool.outerPen.restore();
        }, 10000)
    }

    ////
    //canvas.onclick = function () {
    //    var x = event.clientX;
    //    var y = event.clientY;
    //    var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", { x: x, y: y });
    //    fireworks.push(bigboom)
    //}

}
//夜空类扩展
NightSky.prototype = {};

export { NightSky };