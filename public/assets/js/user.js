;
(function (global, Vue) {
    Vue.component('user-view', {
        template: '<div> \
            <table class="borded userinfo-table">\
            <tbody>\
                <tr class="info-item">\
                    <th></th>\
                    <th>内容</th>\
                </tr>\
                <tr class="info-item" v-for="(item,key) in items" >\
                    <td>{{item.title}}</td>\
                    <td>\
                        <template v-if="!status && item.edit">\
                            <input  class="item-val" type="text" v-model="item.val">\
                        </template>\
                        <template v-else>\
                            <span class="item-val">{{item.val}}</span> \
                            <span v-if="key == \'uid\'" style="color:red;">(ID不允许修改)</span> \
                        </template>\
                    </td>\
                </tr>\
                </tbody>\
            </table>\
            <div class="btn-group userinfo-tool">\
                <template v-if="status">\
                   <span class="btn btn-danger" v-on:click="changeModel">修改</span>\
                </template>\
                <template v-else>\
                    <span class="btn btn-green" v-on:click="saveInfo">保存</span>\
                    <span class="btn btn-danger" v-on:click="changeModel">取消</span>\
                </template>\
            </div>\
        </div>',
        props: ['userItems', 'status', 'changeModel'],
        data: function () {
            return {items: this.userItems}
        },
        methods: {
            saveInfo: function () {
                var updata = {
                    uid: this.items.uid.val,
                    uname: this.items.uname.val,
                    age: this.items.age.val,
                    sex: this.items.sex.val,
                    nick_name: this.items.nick_name.val
                };
                var parse_data = Object.keys(updata).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(updata[key])).join('&');
                var myInit = {
                    method: 'POST',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // body: $.param(updata)
                    body: parse_data
                };

                fetch('/admin/user/update', myInit).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.code == 1) {
                        window.location.reload();
                    } else {
                        alert('更新失败');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
        }
    });
    var userInfo = new Vue({
        el: '#user',
        data: {
            model: 'display'
        },
        methods: {
            changeModel: function () {
                this.model = this.model == 'edit' ? 'display' : 'edit';
            },
            cancle: function () {
                this.model = 'display';
            }
        },
        computed: {
            getStatus: function () {
                return this.model === 'display';
            }
        }
    });
})(window, Vue)