<script setup lang="ts">
/**
 * @description 移动端注册-Tag设置
 * @date 2025/1/23
 */
import MobileCard from '@/components/reusable/MobileCard.vue';
import { ScrollArea } from '@/components/ui/scroll-area'
import { onMounted, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { ArrayCover, mapNewArray } from '@/composables/tools';

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
interface ChooseType {
  GroupIndex: number
  TagChoose: boolean[]
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
  { GroupID: 12, GroupName: "IT类", Tags: [{ TagID: 1, TagName: '前端' }, { TagID: 2, TagName: '后端不好不' }, { TagID: 3, TagName: '运维好上' }, { TagID: 4, TagName: '运' }, { TagID: 5, TagName: '运维好上号上号' }, { TagID: 6, TagName: '运' }, { TagID: 7, TagName: '运维好上号上号' },] },
  { GroupID: 13, GroupName: "数学", Tags: [{ TagID: 8, TagName: '前端' }, { TagID: 9, TagName: '后端' }, { TagID: 10, TagName: '运维' },] },
  { GroupID: 14, GroupName: "英语", Tags: [{ TagID: 11, TagName: '前端' }, { TagID: 12, TagName: '后端' }, { TagID: 13, TagName: '运维' },] },
  { GroupID: 15, GroupName: "工具", Tags: [{ TagID: 14, TagName: '前端' }, { TagID: 15, TagName: '后端' }, { TagID: 16, TagName: '运维' },] },
  { GroupID: 16, GroupName: "元神", Tags: [{ TagID: 17, TagName: '前端' }, { TagID: 18, TagName: '后端' }, { TagID: 19, TagName: '运维' },] },
  { GroupID: 17, GroupName: "游戏", Tags: [{ TagID: 20, TagName: '前端' }, { TagID: 21, TagName: '后端' }, { TagID: 22, TagName: '运维' },] },
  { GroupID: 18, GroupName: "新果冻", Tags: [{ TagID: 23, TagName: '前端' }, { TagID: 24, TagName: '后端' }, { TagID: 25, TagName: '运维' },] },
];

//用于标记某个tag是否被选择
const list_tagChoose = ref<ChooseType[]>([]);


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
/**
 * 判断这个tag是否被选择
 * @param index
 */
const TagisChoose = (index: number) => list_tagChoose.value[GroupIndex.value].TagChoose[index];

/**
 * 选择某个Tag
 * @param item
 */
const onChooseTag = (index: number) => {
  const isChoose: boolean = TagisChoose(index);
  list_tagChoose.value[GroupIndex.value].TagChoose[index] = !isChoose;
  if (!isChoose) {
    //将未被选择的tag纳入选择数组
    Tags_selected.value.push(Group_list[GroupIndex.value].Tags[index]);
  } else {
    //将被选择的tag移除选择数组
    const choose_tagID: number = Group_list[GroupIndex.value].Tags[index].TagID;
    const popIndex: number = Tags_selected.value.findIndex(item => item.TagID === choose_tagID);
    popIndex !== -1 && Tags_selected.value.splice(popIndex, 1);
  }
}

/**
 * 从我的Tag中移除某个Tag
 * @param TagID
 */
const onRemoveTag = (TagID: number) => {
  let _GroupIndex: number = -1;
  let _TagIndex: number = -1;
  Group_list.forEach((item, index) => {
    let result = item.Tags.findIndex(tag => tag.TagID === TagID);
    if (result !== -1) {
      _GroupIndex = index;
      _TagIndex = result;
    }
  });
  list_tagChoose.value[_GroupIndex].TagChoose[_TagIndex] = !list_tagChoose.value[_GroupIndex].TagChoose[_TagIndex];
  const popIndex: number = Tags_selected.value.findIndex(item => item.TagID === TagID);
  popIndex !== -1 && Tags_selected.value.splice(popIndex, 1);
}

onMounted(() => {
  // 数据初始化
  GroupIndex.value = 0;
  //逐个删除，触发动画
  ArrayCover<TagType>(Tags_content.value, Group_list[GroupIndex.value].Tags);
  ArrayCover<TagType>(Tags_selected.value, []);
  const t: ChooseType[] = Group_list.map((item, GroupIndex) => {
    return { GroupIndex, TagChoose: item.Tags.map((tag) => false) }
  })
  ArrayCover<ChooseType>(list_tagChoose.value, t);
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
        <!-- ------ -->
        <!-- Tag选择框 -->
        <div class="h-full line-col bg-background w-[72%] rounded-buttonRadius space-y-2 p-4">
          <!-- Tag选择区域 -->
          <ScrollArea class="flex-1 w-full">
            <div class="w-full grid grid-cols-3 gap-4" v-auto-animate>
              <div class="rounded-inputRadius bg-muted-foreground h-8 text-[1rem]/[2rem]
              text-center text-nowrap overflow-hidden duration-300" v-for="(item, index) in Tags_content"
                :key="item.TagID" :class="[getTagClass(item.TagName), TagisChoose(index) ? 'bg-text-blue' : '']"
                @click="onChooseTag(index)">
                {{
                  item.TagName }}
              </div>
            </div>
          </ScrollArea>
          <div class="text-text-blue text-[1rem] self-start ml-2">我的Tag:</div>
          <!-- 已选择的Tag -->
          <ScrollArea class="flex-1 w-full line-col
          border-foreground border-2 rounded-inputRadius p-1 shadow-[inset_3px_3px_4px_rgba(0,0,0,0.6)]">
            <div class="w-full grid grid-cols-3 gap-4" v-auto-animate>
              <div class=" relative rounded-inputRadius bg-muted-foreground h-8 text-[1rem]/[2rem]
              text-center text-nowrap  " v-for="item in Tags_selected" :key="item.TagID"
                :class="getTagClass(item.TagName)">
                {{
                  item.TagName }}
                <i class="fa-regular fa-circle-xmark absolute
                !text-destructive text-[1rem] top-[-0.25rem] right-[-0.25rem]" @click="onRemoveTag(item.TagID)"></i>
              </div>

            </div>
          </ScrollArea>
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
