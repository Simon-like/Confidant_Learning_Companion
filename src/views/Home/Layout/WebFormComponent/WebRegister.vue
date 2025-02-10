<script setup lang="ts">
/**
 * @description 网页端注册页
 */
import WebCard from '@/components/reusable/WebCard.vue';
import router from '@/router';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ScrollArea } from '@/components/ui/scroll-area'
import { onMounted, ref } from 'vue';
import { ArrayCover, mapNewArray } from '@/composables/tools';
import * as z from 'zod';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';

const phone = ref('');//手机号
const password = ref('');//新密码
const confirm_password = ref('');//确认密码
const username = ref('');//用户昵称

// 表单校验
const formSchema = toTypedSchema(z.object({
  phone: z.string().nonempty("手机号不能为空"),
  code: z.array(z.coerce.string()).length(6, { message: '请填写完整验证码' }),
  password: z.string()
    .regex(/[a-zA-Z]/, '密码包含字母')  // 至少包含一个字母
    .regex(/[0-9]/, '密码包含数字')  // 至少包含一个数字,
    .min(8, '密码至少8位'),  // 最少 8 个字符
  confirm_password: z.string().refine(
    (value) => value === password.value,
    '两次密码输入不一致'
  ),
  username: z.string().nonempty("用户名不能为空"),
}));

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    code: [],//验证码初始值
  },
});

//验证码输入完全
const handleComplete = (e: string[]) => console.log(e.join(''))


interface ListType {
  id: number
  label: string
  value: string
}

const gender_value = ref('0');//性别
const gender_list: ListType[] = [
  { id: 0, label: '男', value: '1' },
  { id: 1, label: '女', value: '2' },
  { id: 2, label: '不愿透露', value: '0' },
];//性别信息，value要求为字符串，需要转给后端数字



//人生阶段信息
const phaseIndex = ref(6)//当前选择ID
//信息列表
const phase_list: ListType[] = [
  { id: 0, label: '初高中', value: '1' },
  { id: 1, label: '大学生', value: '2' },
  { id: 2, label: '读研博士', value: '3' },
  { id: 3, label: '自由探索', value: '4' },
  { id: 4, label: '职场小白', value: '5' },
  { id: 5, label: '团队灵魂', value: '6' },
  { id: 6, label: '其他', value: '0' },
]
//选择人生阶段
const onChoosePhase = (listId: number) => {
  phaseIndex.value = listId;
  console.log(phaseIndex.value);
}


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
  <WebCard class="!w-100-minus-160 h-[500px] select-none overflow-hidden" :is-unfold="true" :title="'用户注册'">
    <form class=" line-jb h-full py-10 px-12 gap-4 lg:gap-12 text-nowrap" @submit="">
      <!-- 网页端注册-账号密码 -->
      <section class="w-full grow flex flex-col h-full flex-1">
        <!-- 手机号输入 -->
        <FormField v-slot="{ componentField }" name="phone" v-model="phone" :validate-on-blur="!isFieldDirty">
          <FormItem class="space-y-0" v-auto-animate>
            <FormLabel class="text-[1.8rem] transition-all">手机号
            </FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入绑定手机号" v-bind="componentField"
                class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
            </FormControl>
            <div class="h-1 w-full"></div>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- 密码操作相关行 -->

        <div class="flex items-center justify-between w-full mt-4">
          <p>验证码</p>
          <Button class="rounded-inputRadius text-[1.2rem] button">
            发送验证码
          </Button>
        </div>

        <!-- 验证码 -->
        <FormField v-slot="{ componentField, value }" name="code">
          <FormItem>
            <FormControl>
              <PinInput id="pin-input" :model-value="value" placeholder="-" class="flex items-center mt-4" otp
                type="number" :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                  setFieldValue('code', arrStr.filter(Boolean))
                }">
                <PinInputGroup class="w-full justify-between">
                  <PinInputInput v-for="(id, index) in 6" :key="id" :index="index"
                    class="text-text-foreground rounded-inputRadius first:!rounded-inputRadius last:!rounded-inputRadius border-2 border-text-foreground" />
                </PinInputGroup>
              </PinInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- 密码输入 -->
        <FormField v-slot="{ componentField }" name="password" v-model="password" :validate-on-blur="!isFieldDirty">
          <FormItem class="space-y-0" v-auto-animate>
            <FormLabel class="text-[1.8rem] transition-all">新密码
            </FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入密码" v-bind="componentField"
                class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
            </FormControl>
            <div class="h-1 w-full"></div>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- 确认密码输入 -->
        <FormField v-slot="{ componentField }" name="confirm_password" v-model="confirm_password"
          :validate-on-blur="!isFieldDirty">
          <FormItem class="space-y-0" v-auto-animate>
            <FormLabel class="text-[1.8rem] transition-all">再次确认
            </FormLabel>
            <FormControl>
              <Input type="text" placeholder="请确认密码" v-bind="componentField"
                class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
            </FormControl>
            <div class="h-1 w-full"></div>
            <FormMessage />
          </FormItem>
        </FormField>

      </section>
      <!-- 分割线 -->
      <div class="h-full w-1 rounded-lg bg-foreground"></div>
      <!-- 网页端注册-昵称性别人生阶段 -->
      <section class="w-full grow flex flex-col h-full flex-1">

        <!-- 用户昵称输入 -->
        <FormField v-slot="{ componentField }" name="username" v-model="username" :validate-on-blur="!isFieldDirty">
          <FormItem class="space-y-0" v-auto-animate>
            <FormLabel class="text-[1.8rem] transition-all">用户昵称
            </FormLabel>
            <FormControl>
              <Input type="text" placeholder="请输入用户昵称" v-bind="componentField"
                class="focus-visible:ring-0 !blue-ring-card-small !rounded-inputRadius" />
            </FormControl>
            <div class="h-1 w-full"></div>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="w-full grow flex flex-col justify-center space-y-4">
          <!-- 性别设置 -->
          <RadioGroup default-value="0" v-model="gender_value" class="line-jb">
            <div class="text-[1.2rem] text-text-blue">性别</div>
            <div class="flex items-center space-x-2" v-for="item in gender_list" :key="item.id">
              <RadioGroupItem :id="item.value" :value="item.value"
                class="rounded border-2 size-[1.2rem] border-foreground text-foreground" />
              <Label :for="item.value">{{ item.label }}</Label>
            </div>
          </RadioGroup>
          <!-- 人生阶段设置 -->
          <div class="flex flex-col">
            <div class="self-start mb-4 text-[1.2rem] text-text-blue"> 你目前的人生阶段？</div>
            <div class="grid w-full grid-cols-3 gap-6">
              <div class="bg-background h-12 rounded-inputRadius text-center
            text-text-foreground text-nowrap text-[1rem]/[3rem] duration-300 border-foreground border-[2px]"
                v-for="item in phase_list" :key="item.id" @click="onChoosePhase(item.id)"
                :class="{ 'bg-text-blue text-background': phaseIndex === item.id }">
                {{ item.label }}
              </div>
            </div>
          </div>

        </div>

      </section>
      <!-- 分割线 -->
      <div class="h-full w-1 rounded-lg bg-foreground"></div>
      <!-- 网页端注册-tag设置 -->
      <section class="w-full grow flex flex-col h-full flex-1">
        <div class="w-full grow flex flex-col justify-center space-y-4">
          <!-- Tag设置区 -->
          <div class="w-full flex space-x-6 h-[40vh] ">
            <!-- Tag大类 -->
            <ScrollArea class="bg-background w-[28%] rounded-inputRadius overflow-auto p-3 blue-ring-card-small">
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
            <div class="h-full line-col bg-background w-[72%] rounded-inputRadius space-y-2 p-4 blue-ring-card-small">
              <!-- Tag选择区域 -->
              <ScrollArea class="flex-1 w-full">
                <div class="w-full grid grid-cols-3 gap-4" v-auto-animate>
                  <div class="rounded-inputRadius bg-muted h-8 text-[1rem]/[2rem]
              text-center text-nowrap overflow-hidden duration-300" v-for="(item, index) in Tags_content"
                    :key="item.TagID"
                    :class="[getTagClass(item.TagName), TagisChoose(index) ? 'bg-text-blue text-primary' : '']"
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

          <Button class="w-full text-[1.5rem] h-12 button-accent">开始学习旅程！</Button>
          <div class="flex justify-end items-end w-full">
            <p class="text-[1rem]">我有账号！</p>
            <RouterLink :to="'/home/weblogin'" class="text-text-blue text-[1.2rem] link-blue">去登陆</RouterLink>
          </div>
        </div>
      </section>


    </form>
  </WebCard>
</template>

<style scoped></style>
