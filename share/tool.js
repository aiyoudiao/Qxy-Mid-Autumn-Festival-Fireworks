/*
 * File: tool.js                                                               *
 * Project: qy-mind-autumn-festival-fireworks                                  *
 * Created Date: 2022-09-10 18:02:41                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-10 18:02:41                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

const Colors = [
    '#FFB7DD',
    '#FF88C2',
    '#FFCCCC',
    '#FF8888',
    '#FFC8B4',
    '#FFDDAA',
    '#FFEE99',
    '#99FF99',
    '#66FF66',
    '#BBFFEE',
    '#77FFCC',
    '#AAFFEE',
    '#77FFEE',
    '#99FFFF',
    '#66FFFF',
    '#CCEEFF',
    '#77DDFF',
    '#CCDDFF',
    '#99BBFF',
    '#CCCCFF',
    '#9999FF',
    '#CCBBFF',
    '#9F88FF',
    '#D1BBFF',
    '#B088FF',
    '#E8CCFF',
    '#D28EFF',
    '#F0BBFF',
    '#E38EFF',
    '#FFB3FF',
    '#33FFFF',
    '#00FFFF',
    '#33CCFF',
    '#00BBFF',
    '#5599FF',
    '#0066FF',
    '#5555FF',
    '#0000FF',
    '#0000CC',
    '#7744FF',
    '#5500FF',
    '#4400CC',
    '#9955FF',
    '#7700FF',
    '#5500DD',
    '#4400B3',
    '#B94FFF',
    '#9900FF',
    '#7700BB',
    '#E93EFF',
    '#CC00FF',
    '#FF77FF',
    '#FF3EFF',
    '#FF00FF',
]

//--------------------工具类----------------------

//工具类 包含工具的一些详细信息
const Tool = function () {

    //封装一个返回随机数的方法 直接返回 Math.Random()*value 结果
    this.random = function (value) {
        //直接返回结果
        return Math.random() * value;

    }

    //写一个自定义随机非整数的方法
    this.coustomRandomNotInt = function (min, max) {
        //获取计算后的结果
        var result = Math.random() * (max - min) + min;
        //返回结果
        return result;
    }

    //写一个自定义随机整数的方法
    this.coustomRandom = function (min, max) {
        //获取计算后的结果
        var result = Math.random() * (max - min) + min;
        //返回四舍五入后的整数结果
        return Math.round(result);
    }

    //写一个返回RGBA色值的方法
    this.RgbaColor = function (red, green, blue, alpha) {
        return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    }

    //写一个集合用来存取所有明亮的颜色  烟花要亮亮的
    var colors = Colors 

    //写一个返回用户自定义RGBA色值的方法
    this.coustomRgbaColor = function (min, max, alpha) {
        // //红色的值
        // var red = this.coustomRandom(min, max);
        // //绿色的值
        // var green = this.coustomRandom(min, max);
        // //蓝色的值
        // var blue = this.coustomRandom(min, max);
        // //返回最后用户自定义的一个rgba的色值
        // return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

        //随机获取颜色集合长度范围内的非整数
        var result = Math.random() * (colors.length - 2) + 1;
        //将四舍五入后的整数作为 颜色集合的索引
        var colorIndex = Math.round(result);
        //返回指定索引的颜色
        return colors[colorIndex];

    }

    //写一个返回 经过指定运算后 四舍五入后的值
    this.coustomRound = function (value) {
        //进行随机数运算
        var randomResult = this.random(value);
        //进行四舍五入
        var roundResult = Math.round(randomResult);
        //返回结果
        return roundResult;
    }

    //---------------------这块儿用于 夜空类中 创建特殊烟花对象时需要的-------------------------

    //特殊形状的索引
    var index = -1;
    //形状对象的总个数
    var count = document.querySelectorAll(".shape").length;

    //自动按照顺序获取索引
    this.AutoSortShapeIndex = function () {
        //判断索引是否在范围内
        if (index < count) {
            //索引加一
            index = index + 1;

        } else {
            //回到第一个
            index = 0;

        }
        //返回索引
        return index;

    }

    //---------------------------------------------------------------
}

//工具类扩展
Tool.prototype = {};

//工具类的静态方法
Tool.init = function () {
    //内部隐藏的画布  （看不见）
    Tool.innerCanvas = document.createElement("canvas");
    //外部显示的画布  （可以看见）
    Tool.outerCanvas = document.getElementById("outerCanvas");;

    //内部隐藏的画布用的画笔
    Tool.innerPen = Tool.innerCanvas.getContext("2d");

    //外部显示的画布用的画笔
    Tool.outerPen = Tool.outerCanvas.getContext("2d");

    //设置两个画布的 宽度和高度
    Tool.innerCanvas.width = Tool.outerCanvas.width = window.innerWidth;
    Tool.innerCanvas.height = Tool.outerCanvas.height = window.innerHeight//700;
}

//这是一个单次定时触发请求动画帧       各种浏览器的兼容性   当动画使用的过于频繁时  会出现问题  这种写法就能解决问题
const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };

export { Tool, raf, Colors };