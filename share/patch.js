/*
 * Filename: e:\mycode\Qy-Mid-Autumn-Festival-Fireworks\qy-mind-autumn-festival-fireworks\share\polifill
 * Path: e:\mycode\Qy-Mid-Autumn-Festival-Fireworks\qy-mind-autumn-festival-fireworks
 * Created Date: Saturday, September 10th 2022, 7:12:28 pm
 * Author: aiyoudiao
 * 
 * Copyright (c) 2022 aiyoudiao
 */

//给数组加一个方法
Array.prototype.foreach = function (callback) {
    //循环遍历数组对象
    for (var i = 0; i < this.length; i++) {
        //是只要当前数组中的对象有效
        if (this[i] !== null)
            //就让当前对象继承自这个回掉函数  这样的话 回掉函数内部可以使用this关键字调用数组中的对象  
            callback.apply(this[i], [i])
    }
}