/*
 * File: firework-particle.js                                                  *
 * Project: qy-mind-autumn-festival-fireworks                                  *
 * Created Date: 2022-09-10 18:09:58                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-10 18:09:58                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */
import { Tool } from './tool';

//--------------------烟花片段类----------------------
//烟花片段类 包含烟花片段的一些详细信息
const FireWorkParticle = function (fwX, fwY, radius, color, moveRangeX, moveRangeY) {
    //创建一个工具
    this.tool = new Tool();


    //当前烟花片段在X轴与Y轴上的可移动范围
    this.moveRangeX = moveRangeX;
    this.moveRangeY = moveRangeY;
    //当前烟花片段的坐标  也就是当前烟花的坐标
    this.fireWorkParticleX = fwX;
    this.fireWorkParticleY = fwY;
    //烟花片段是否已经爆炸   烟花爆炸就会产生烟花片段  而烟花片段爆炸 就表示烟花片段要消失了
    this.blast = false;
    //烟花片段的颜色
    this.color = color;
    //烟花片段的半径
    this.radius = radius;

    //-----------------------------------------------------------------------------
    //显示烟花片段
    this.show = function () {

        //保存画笔当前状态
        Tool.outerPen.save();
        //开始路径
        Tool.outerPen.beginPath();
        //开始画圆
        Tool.outerPen.arc(this.fireWorkParticleX, this.fireWorkParticleY, this.radius, 0, 2 * Math.PI);
        //设置填充颜色
        Tool.outerPen.fillStyle = this.tool.RgbaColor(this.color.red, this.color.green, this.color.blue, this.color.alpha);//"rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        //填充
        Tool.outerPen.fill()
        //返回画笔原状态
        Tool.outerPen.restore();

    }

    //烟花片段 移动  烟花片段是活的 受重力影响
    this.move = function () {
        //-------扩展区域-------
        //这个在这里设置 烟花片段坐标时  会产生意想不到的效果
        //当你不断的改移动范围  会出现 烟花片段坐标 不断的更改  
        //范围变大 烟花片段就会往下和往右  范围变小 烟花片段就会往上和往左 
        this.moveRangeY = this.moveRangeY + 0.1;
        // this.moveRangeX = this.moveRangeX - 1;

        //----------------


        //当前烟花片段可移动范围 减去 当前烟花片段的坐标位置   获取每次移动范围增量总值
        var pixelX = this.moveRangeX - this.fireWorkParticleX;
        var pixelY = this.moveRangeY - this.fireWorkParticleY;
        //        x轴的点距离绝对值是否小于0.1  

        //重新设置坐标   让当前烟花片段按照一定的增量修改 烟花片段的位置
        this.fireWorkParticleX = Math.abs(pixelX) < 0.1 ? this.moveRangeX : (this.fireWorkParticleX + pixelX * 0.1 );
        this.fireWorkParticleY = Math.abs(pixelY) < 0.1 ? this.moveRangeY : (this.fireWorkParticleY + pixelY * 0.1);
        //判断当前 可移动的增量总值是否到达了极限 
        if (pixelX === 0 && Math.abs(pixelY) <= 520) {
            //设置档期那烟花片段已经爆炸 可以消失了
            this.blast = true;
        }
        //显示烟花片段
        this.show();
    }



}
//烟花片段类扩展
FireWorkParticle.prototype = {};

export { FireWorkParticle };