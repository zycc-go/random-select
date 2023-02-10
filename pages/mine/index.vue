<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">选项卡1的内容</view>
			<view v-show="current === 1">选项卡2的内容</view>
			<view v-show="current === 2">选项卡3的内容</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			items: ['选项1', '选项2', '选项3'],
			current: 0
		};
	},

	methods: {
		onClickItem(e) {
			if (this.current != e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
</script>
