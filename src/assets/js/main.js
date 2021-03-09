var app = new Vue({
    el: '.mainbody',
    data: {
        list1: [{title: '实例1',isFolder: true,size: 2,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"},
        {title: '实例2',isFolder: true,size: 1.5,time: "YYYY:MM:DD"}],
        selAll: false
    },
    computed: {
        pagenum: function() {
            list_length = this.list1.length
            num = list_length/12
            return parseInt(num)+1
        }
    },
    methods: {
        
    }
})