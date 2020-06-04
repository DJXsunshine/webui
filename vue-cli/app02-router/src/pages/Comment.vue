<template>
  <div class="comment">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="评论设置" name="first">
        <el-table :data="comments.list" stripe style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="article.title" label="文章标题"></el-table-column>
          <el-table-column prop="article.categoryId" :formatter="showCategoryName" label="所属栏目"></el-table-column>
          <el-table-column prop="article.publishtime" :formatter="dateFormat" label="发布时间"></el-table-column>
          <el-table-column prop="customer.nickname" label="作者"></el-table-column>
          <el-table-column prop="article.readtimes" label="阅读次数"></el-table-column>
          <el-table-column label="评论状态">
            <template slot-scope="scope">
              <el-switch
                @change="checkComment(scope.row)"
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论列表" name="second">
        <el-table :data="comments.list" stripe style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="article.title" label="所属文章"></el-table-column>
          <el-table-column prop="content" label="评论内容"></el-table-column>
          <el-table-column prop="customer.username" label="评论者"></el-table-column>
          <el-table-column prop="commenttime" :formatter="dateFormat" label="评论时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除当前行数据吗？"
                @onConfirm="commentDelete(scope.$index, scope.row)"
              >
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      @current-change="changePage"
      :page-size="comments.pageSize"
      :current-page="comments.page+1"
      layout="prev, pager, next"
      :total="comments.total"
    ></el-pagination>
  </div>
</template>

<script>
import $ from "jquery";
import moment from "moment";
import Common from "../components/common";

export default {
  data() {
    return {
      activeName: "first",
      comments: [],
      params: {
        page: 0,
        pageSize: 10
      },
      categories: []
    };
  },
  watch: {
    params: {
      handler: function() {
        this.loadComment();
      },
      deep: true
    }
  },
  created() {
    this.findAllCategory();
    this.loadComment();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 评论审核
    checkComment(item) {
      if (item.status) {
        var obj = {
          id: item.id,
          status: "审核通过"
        };
      } else {
        var obj = {
          id: item.id,
          status: "审核未通过"
        };
      }
      $.get(Common.baseUrl + "manager/comment/checkComment", obj, res => {
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
        this.loadComment();
      });
    },
    loadComment() {
      $.get(
        Common.baseUrl + "manager/comment/findComment",
        this.params,
        res => {
          this.comments = res.data;
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
    // 时间处理
    dateFormat(row, column) {
      return moment(row[column.property]).format("YYYY-MM-DD hh:mm:ss");
    },
    // 分页
    changePage(page) {
      // 当前页
      this.params.page = page - 1;
    },
    findAllCategory() {
      $.get(Common.baseUrl + "manager/category/findAllCategory", "get", res => {
        this.categories = res.data;
      });
    },
    showCategoryName(row, column) {
      if (row["article"]) {
        return this.categories.filter(function(it) {
          return it.id == row["article"]["categoryId"];
        })[0].name;
      }
    },
    commentDelete(index, row) {
      $.get(
        Common.baseUrl + "manager/comment/deleteCommentById",
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
            this.loadComment();
          }
        }
      );
    }
  }
};
</script>