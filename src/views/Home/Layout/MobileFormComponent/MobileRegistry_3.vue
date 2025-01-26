<script setup lang="ts">
/**
 * @description 移动端注册-个人信息
 * @date 2025/1/23
 */
import MobileCard from '@/components/reusable/MobileCard.vue';
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ref } from 'vue';
import { Button } from '@/components/ui/button';

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

const fn = () => {
  console.log(gender_value.value);
}


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


</script>

<template>
  <MobileCard :h="'full'" :title="'认识一下吧'">
    <div class="w-full grow flex flex-col justify-center pt-8 space-y-8">
      <!-- 性别设置 -->
      <RadioGroup default-value="0" v-model="gender_value" class="line-jb">
        <div>性别</div>
        <div class="flex items-center space-x-2" v-for="item in gender_list" :key="item.id">
          <RadioGroupItem :id="item.value" :value="item.value" class="rounded border-2 size-[1.2rem]" />
          <Label :for="item.value">{{ item.label }}</Label>
        </div>
      </RadioGroup>
      <!-- 人生阶段设置 -->
      <div class="flex flex-col">
        <div class="self-start mb-8"> 你目前的人生阶段？</div>
        <div class="grid w-full grid-cols-3 gap-8">
          <div class="bg-background h-12 rounded-inputRadius text-center
            text-text-foreground text-nowrap text-[1rem]/[3rem] duration-300" v-for="item in phase_list" :key="item.id"
            @click="onChoosePhase(item.id)" :class="{ 'bg-text-blue text-background': phaseIndex === item.id }">
            {{ item.label }}
          </div>
        </div>
      </div>

      <Button @click="fn" class="w-full my-6 text-[1.5rem] h-12">下一步</Button>
      <div class="flex justify-end items-end w-full">
        <RouterLink :to="'/home/register_4'" class="text-text-blue text-[1.5rem]">跳过设置</RouterLink>
        <p class="text-[1rem]">（以后在了解吧）</p>
      </div>
    </div>
  </MobileCard>
</template>

<style scoped></style>
