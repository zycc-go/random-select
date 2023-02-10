<template>
	<div class="region-top">
		<uni-segmented-control :current="current" :values="items" @clickItem="clickItem" activeColor="#4cd964">
		</uni-segmented-control>
		<uni-list v-if="!loading">
			<uni-list-item v-for="item in list" :key="item.id" :title="item.value" :note="item.remark"
				rightText="2020-02-02 20:20" clickable @longtap=" e => onToDetail(item, e)">
			</uni-list-item>
		</uni-list>
		<view class="region-top-status" v-else>
			<uni-load-more status="loading" iconSize='40'></uni-load-more>
		</view>
	</div>
	<view class="region-center">{{ selected?.value }}</view>
	<view class="region-bottom">
		<view class="region-bottom-click" @click="onSelectRandom">
			<uni-icons type="paperplane" size="40" color="#eee"></uni-icons>
			<text>{{ !randomLoading ? '开始' : '停止'}}</text>
		</view>
	</view>
</template>
<script setup>
	import { onMounted, ref, reactive } from 'vue';
	import { onShareAppMessage } from '@dcloudio/uni-app'
	const items = reactive(['吃的', '喝的', '玩的', '乐子']); // 分类
	const current = ref(0); // 当前分类
	const loading = ref(false);
	const list = ref([]); // 列表
	const selected = ref({}); // 随机选中的
	const randomLoading = ref(false) // 随机状态
	const randomTime = ref(false) // 随机计时器
	const randomCount = ref(0) // 随机计时

	onMounted(() => {
		onGetList()
	});

	onShareAppMessage(() => {
		return {
			title: 'mallz',
			desc: '选择困难症的福音',
			path: '/pages/home/index'
		}
	})

	const arr = [
		[
			{ id: 1, value: '蜜雪冰城', remark: '你爱我我爱你...', status: 1 },
			{ id: 2, value: 'CoCo', remark: '', status: 0 },
			{ id: 3, value: '阿水大杯茶', remark: '阿水...', status: 1 }
		],
		[
			{ id: 1, value: '炸鸡', remark: '配啤酒...', status: 1 },
			{ id: 2, value: '烤鸭', remark: '鸭脖子', status: 1 },
			{ id: 3, value: '烧鹅', remark: '尝试一下', status: 0 }
		]
	]

	const clickItem = ({ currentIndex }) => {
		current.value = currentIndex
		selected.value = {}
		onGetList()
	}

	const onGetList = () => {
		loading.value = true
		setTimeout(() => {
			list.value = arr[current.value]
			loading.value = false
		}, 500)
	}

	const onToDetail = (value, e) => {
		const { x, y } = e.target
		console.log(value, e.target, 'longtap');
	}

	const onSelectRandom = () => {
		if (randomLoading.value) {
			clearInterval(randomTime.value)
			randomLoading.value = false
			randomCount.value = 0
			randomTime.value = null
		} else {
			randomTime.value = setInterval(() => {
				if (randomCount.value > 20) {
					onSelectRandom()
					return
				}
				randomLoading.value = true
				const random = Math.round(Math.random() * (list.value.length - 1))
				selected.value = { ...list.value[random] }
				randomCount.value++
			}, 100)
		}
	}
	// }const onGetList = async () => {
	// 	try {
	// 		const data = await Promsie((resolve) => {
	// 			console.log(888);
	// 			resolve(arr[current.value])
	// 		})
	// 		console.log(111, data, 'data')
	// 	} catch (e) {
	// 		console.log('onGetList', e);
	// 	}
	// }
</script>

<style lang="scss" scoped>
	.region-top {
		height: calc(100vh - 300px);

		.region-top-status {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.region-center {
		height: 100px;
		font-size: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eef;
	}

	.region-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		background-color: #eee;

		.region-bottom-click {
			width: 100px;
			height: 100px;
			font-size: 12px;
			color: #eee;
			background-color: #2979ff;
			border-radius: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			text {
				margin-top: 4px;
			}
		}
	}
</style>
