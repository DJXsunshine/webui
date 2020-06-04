<script>
export default {
    data () {
        return {
            msg:'hello render'
        }
    },
    render: function (createElement) {
        return createElement('h2',{
            ref: 'myRef',
            // 添加类名
            'class':{
                one:true
            },
            // 添加样式
            'style':{
                color:'red'
            },
            // 添加普通属性
            attrs:{
                id:'render',
                name:'vue'
            },
            // 添加事件
            on:{
                click:function(){
                    alert(1)
                }
            }
        },this.msg);
    },
    beforeCreate () {
        // alert('beforeCreate')
        // console.log('beforeCreate',this.$refs.myRef);
        // console.log('mounted',document.getElementById('render'));
    },
    created () {
        // alert('created')
        // console.log('created',this.$refs.myRef);
        // console.log('mounted',document.getElementById('render'));
    },
    beforeMount () {
        // alert('beforeMount')
        // console.log('beforeMount',this.$refs.myRef);
        // console.log('mounted',document.getElementById('render'));
    },
    mounted () {
        // alert('mounted')
        // console.log('mounted',this.$refs.myRef);
        // console.log('mounted',document.getElementById('render'));
    }
}
</script>
