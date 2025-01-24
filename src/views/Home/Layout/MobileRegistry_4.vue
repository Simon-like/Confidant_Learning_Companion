<script setup lang="ts">
/**
 * @description 移动端注册-Tag设置
 * @date 2025/1/23
 */
import MobileCard from '@/components/reusable/MobileCard.vue';
import { ScrollArea } from '@/components/ui/scroll-area'
import { onMounted, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { deepCopy, ArrayCover } from '@/composables/tools';

// Tag数组
interface TagType {
  TagID: number
  TagName: string
}

interface GroupType {
  GroupID: number
  GroupName: string
  Tags: TagType[]
}

/**
 * @description 计算某个tag的内容长度，改变tag组件的长度
 * @param tag
 */
function getTagClass(tag: string) {
  const length = tag.length;

  // 判断每个标签的长度，决定跨多少列
  if (length <= 2) {
    return "col-span-1"; // 3个字符以内，占一列
  } else if (length <= 5) {
    return "col-span-2"; // 3-5个字符，占两列
  } else {
    return "col-span-3"; // 超过5个字符，占三列
  }
}

//大类数组
const Group_list: GroupType[] = [
  { GroupID: 12, GroupName: "IT类", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端不好不' }, { TagID: 3, TagName: '运维好上' }, { TagID: 4, TagName: '运' }, { TagID: 3, TagName: '运维好上号上号' }, { TagID: 4, TagName: '运' }, { TagID: 3, TagName: '运维好上号上号' },] },
  { GroupID: 13, GroupName: "数学", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
  { GroupID: 14, GroupName: "英语", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
  { GroupID: 15, GroupName: "工具", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
  { GroupID: 16, GroupName: "元神", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
  { GroupID: 17, GroupName: "游戏", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
  { GroupID: 18, GroupName: "新果冻", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端' }, { TagID: 3, TagName: '运维' },] },
];


const GroupIndex = ref(0);//大类定位标识
const Tags_content = ref<TagType[]>([]);//对应的Tag数组
const Tags_selected = ref<TagType[]>([]);//选择的Tag数组

/**
 * 选择大类
 * @param index
 */
const onChosseGroup = (index: number) => {
  GroupIndex.value = index;
  ArrayCover<TagType>(Tags_content.value, Group_list[GroupIndex.value].Tags);
}

onMounted(() => {
  // 数据初始化
  GroupIndex.value = 0;
  //逐个删除，触发动画
  ArrayCover<TagType>(Tags_content.value, Group_list[GroupIndex.value].Tags);
})

</script>

<template>
  <MobileCard :h="'full'" :title="'您感兴趣的是？'">
    <div class="w-full grow flex flex-col justify-center pt-8 space-y-8">
      <!-- Tag设置区 -->
      <div class="w-full flex space-x-6 h-[50vh]">
        <!-- Tag大类 -->
        <ScrollArea class="bg-background w-[28%] rounded-buttonRadius overflow-auto p-3">
          <template v-for="(group, index) in Group_list" class="w-full" :key="group.GroupID">
            <div class="h-12 w-full rounded-inputRadius
            text-[1rem]/[3rem] text-center text-nowrap overflow-hidden text-text-foreground duration-300"
              :class="{ 'bg-muted text-text': GroupIndex === index }" @click="onChosseGroup(index)">{{
                group.GroupName
              }}
            </div>
            <div class="h-1 rounded-lg bg-foreground w-full my-1" v-if="index !== Group_list.length - 1"></div>
          </template>
        </ScrollArea>
        <!-- Tag选择框 -->
        <div class="h-full line-col bg-background w-[72%] rounded-buttonRadius space-y-2 p-4">
          <ScrollArea class="flex-1 w-full">
            <div class="w-full grid grid-cols-3 gap-4" v-auto-animate>
              <div class="rounded-inputRadius bg-muted-foreground h-8 text-[1rem]/[2rem]
              text-center text-nowrap overflow-hidden " v-for="item in Tags_content" :key="item.TagID"
                :class="getTagClass(item.TagName)">
                {{
                  item.TagName }}
              </div>
            </div>
          </ScrollArea>
          <div class="grow-0 h-1 rounded-lg bg-foreground w-full"></div>
          <div class="flex-1 w-full line-col">
            <div class="text-text-blue text-[1rem] self-start ml-2">我的Tag:</div>
          </div>
        </div>
      </div>

      <Button class="w-full my-6 text-[1.5rem] h-12">开始学习旅程！</Button>
      <div class="flex justify-end items-end w-full">
        <RouterLink :to="'/home'" class="text-text-blue text-[1.5rem]">跳过设置</RouterLink>
        <p class="text-[1rem]">（以后在了解吧）</p>
      </div>
    </div>
  </MobileCard>
</template>

<style scoped></style>
