<template>
  <div class="article">
    <!-- 搜索根据时间 -->
    <template>
      <div class="inline-block">
        <span class="demonstration">日期搜索</span>
        <!-- format:显示在输入框中的格式 value-format:绑定值的格式 -->
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right"
        ></el-date-picker>
        <!-- 发布文章 -->
        <el-button plain @click="resetCondition">重置</el-button>
        <el-button plain @click="showArticleVisible" style="float: right;">发布</el-button>
      </div>
    </template>

    <!-- 发布文章模态框 -->
    <el-dialog title="发布文章" :visible.sync="article_visible">
      <el-form :model="article_form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="article_form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章封面" :label-width="formLabelWidth">
          <!-- 图片上传
            action:图片服务器上传接口地址
          -->
          <el-upload
            action="http://134.175.100.63:5588/file/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="successHandler"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth">
          <el-select v-model="article_form.categoryId" placeholder="请选择活动区域">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列表样式" :label-width="formLabelWidth">
          <el-select v-model="article_form.liststyle" placeholder="请选择活动区域">
            <el-option label="样式一" value="true"></el-option>
            <el-option label="样式二" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" v-model="article_form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="article_visible = false">取 消</el-button>
        <el-button type="primary" @click="addArticle">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 文章数据 -->
    <!-- cell-click	当某个单元格被点击时会触发该事件 -->
    <el-table :data="articles.list" @cell-click="showBigPicture" stripe style="width: 100%">
      <el-table-column prop="title" label="文章标题" width="180"></el-table-column>
      <el-table-column prop="content" label="文章内容" width="380"></el-table-column>
      <el-table-column prop="publishtime" :formatter="dateFormat" label="发布时间" width="180"></el-table-column>
      <el-table-column prop="source" label="文章封面">
        <!-- 使用插槽 显示图片 -->
        <template slot-scope="scope">
          <img :src="scope.row.source" alt height="100px" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="文章状态">
        <template slot-scope="scope">
          <el-switch
            @change="checkArticle(scope.row)"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除当前行数据吗？" @onConfirm="articleDelete(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- current-page	当前页数
      page-size	每页显示条目个数
      current-change	currentPage 改变时会触发
    -->
    <el-pagination
      background
      @current-change="changePage"
      :page-size="articles.pageSize"
      :current-page="articles.page+1"
      layout="prev, pager, next"
      :total="articles.total"
    ></el-pagination>

    <!-- 查看大图模态框 -->
    <el-dialog title="大图显示" :visible.sync="picture_visible">
      <img :src="imgUrl" alt width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="picture_visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import Common from "../components/common";

export default {
  data() {
    return {
      username: "",
      articles: [],
      params: {
        page: 0,
        pageSize: 10,
        beginTime: "",
        endTime: ""
      },
      picture_visible: false,
      imgUrl: "",
      article_form: {},
      formLabelWidth: "120px",
      article_visible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      categories: [],
      dateValue: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  // 监听：可以实现分页搜索功能
  watch: {
    params: {
      handler: function() {
        this.loadArticle();
      },
      deep: true
    },
    dateValue() {
      this.params.page = 0;
      this.params.beginTime = this.dateValue[0];
      this.params.endTime = this.dateValue[1];
    }
  },
  methods: {
    resetCondition(){
      this.params.page = 0;
      this.params.beginTime = '';
      this.params.endTime = '';
      this.dateValue= [];
    },
    // 12.删除文章
    articleDelete(index, row) {
      // console.log(index,row);
      $.get(
        Common.baseUrl + "manager/article/deleteArticleById",
        {
          id: row.id
        },
        res => {
          const h = this.$createElement;
          if (res.status == 500) {
            this.$notify({
              title: "警告",
              message: h(
                "i",
                {
                  style: "color: teal"
                },
                res.message
              )
            });
          } else {
            this.$notify({
              title: "成功",
              message: h(
                "i",
                {
                  style: "color: teal"
                },
                res.message
              )
            });
            // 刷新数据
            this.loadArticle();
          }
        }
      );
    },
    // 11.加载所有栏目
    loadCategory() {
      $.ajax({
        url: Common.baseUrl + "manager/category/findAllCategory",
        method: "get",
        data: {},
        success: res => {
          this.categories = res.data;
        }
      });
    },
    // 10.发布文章
    addArticle() {
      this.$refs["upload"].clearFiles();
      $.post(
        Common.baseUrl + "manager/article/saveOrUpdateArticle",
        this.article_form,
        res => {
          const h = this.$createElement;
          if (res.status == 500) {
            this.$notify({
              title: "警告",
              message: h(
                "i",
                {
                  style: "color: teal"
                },
                res.message
              )
            });
          } else {
            this.$notify({
              title: "成功",
              message: h(
                "i",
                {
                  style: "color: teal"
                },
                res.message
              )
            });
          }
          this.article_visible = false;
          this.article_form = {};
          // 刷新数据
          this.loadArticle();
        }
      );
    },
    // 9.显示预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 8.图片上传
    successHandler(res) {
      this.article_form.source = Common.uploadUrl + res.data.id;
    },
    // 7.发布文章
    showArticleVisible() {
      this.article_visible = true;
    },
    // 6.审核文章
    checkArticle(item) {
      // 根据文章状态封装参数
      if (item.status) {
        var obj = {
          id: item.id,
          status: "审核通过"
        };
      } else {
        var obj = {
          id: item.id,
          status: "审核不通过"
        };
      }
      $.get(Common.baseUrl + "manager/article/checkArticle", obj, res => {
        const h = this.$createElement;
        if (res.status == 500) {
          this.$notify({
            title: "警告",
            message: h(
              "i",
              {
                style: "color: teal"
              },
              res.message
            )
          });
        } else {
          this.$notify({
            title: "成功",
            message: h(
              "i",
              {
                style: "color: teal"
              },
              res.message
            )
          });
        }
        // 刷新数据
        this.loadArticle();
      });
    },
    // 5.分页
    changePage(page) {
      // 当前页
      this.params.page = page - 1;
    },
    // 4.查看大图
    showBigPicture(row, column) {
      if (column.label == "文章封面") {
        // 显示模态框
        this.picture_visible = true;
        // 将当前点击的图片地址放到模态框中
        this.imgUrl = row.source;
      }
    },
    // 3.时间处理
    dateFormat(row, column) {
      return moment(row[column.property]).format("YYYY-MM-DD hh:mm:ss");
    },
    // 2.查询文章
    loadArticle() {
      $.get(
        Common.baseUrl + "manager/article/findArticle",
        this.params,
        res => {
          this.articles = res.data;
          // 为了使用开关组件，需要将文章数据进行改变
          res.data.list.forEach(item => {
            if (item.status == "审核通过") {
              item.status = 1;
            } else {
              item.status = 0;
            }
          });
        }
      );
    },
    // 根据token查询用户信息
    findMsg(token) {
      $.ajax({
        url: Common.baseUrl + "manager/user/info",
        method: "get",
        data: {
          token
        },
        success: res => {
          if(res.data)
          this.username = res.data.username;
        }
      });
    },
  },
  // 页面加载的时候
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      // 查询用户信息
      this.findMsg(token);
      // 查询所有文章
      this.loadArticle();
      // 查询所有栏目
      this.loadCategory();
    }
  }
};
</script>