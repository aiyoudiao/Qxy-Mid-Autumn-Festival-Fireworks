/*
 * File: star.js                                                               *
 * Project: qy-mind-autumn-festival-fireworks                                  *
 * Created Date: 2022-09-10 18:05:37                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-10 18:05:37                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import { Tool, raf } from './tool';

//--------------------星星类----------------------

//星星类 包含星星的一些详细信息
const Star = function (starX, starY, starR) {

    //创建一个工具
    var tool = new Tool();

    //x轴的坐标
    this.starX = starX;
    //y轴的坐标
    this.starY = starY;
    //星星的半径
    this.starR = starR;
    //画星星的画笔
    this.pen = Tool.outerPen;

    //显示星星
    this.Show = function () {
        //保存当前画笔的状态
        Tool.outerPen.save();
        //开始路径
        Tool.outerPen.beginPath();
        //画圆
        Tool.outerPen.arc(this.starX, this.starY, this.starR, 0, 2 * Math.PI);
        //设置填充颜色
        Tool.outerPen.fillStyle = tool.coustomRgbaColor(0, 255, this.starR);// tool.RgbaColor(255, 255, 255, this.starR);// "rgba(255,255,255," + this.r + ")";
        //填充
        Tool.outerPen.fill();


        //返回到保存的画笔的状态
        Tool.outerPen.restore();

    }


}
//星星类扩展
Star.prototype = {};

export { Star };


