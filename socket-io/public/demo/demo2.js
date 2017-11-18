define(['demo1'], function(d1) {
    console.log('aa');
    return {
        name: 'demo2',
        age: d1.add(4, 5)
    }　
});