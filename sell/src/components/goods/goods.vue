<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			goods: []
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		this.$http.get('/api/goods').then((response) => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.goods = response.data
			}
		})
	}
}
</script>

<style lang="scss" scoped>
	@import "../../common/scss/mixin.scss";
	
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				padding:0 12px;
				line-height: 14px;
				.icon{
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease{
						@include bg-image('decrease_3')
					}
					&.discount{
						@include bg-image('discount_3')
					}
					&.guarantee{
						@include bg-image('guarantee_3')
					}
					&.invoice{
						@include bg-image('invoice_3')
					}
					&.special{
						@include bg-image('special_3')
					}
				}
				.text{
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					@include border-1px(rgba(7,17,27,0.1));
					font-size: 12px;
				}
			}
		}
		.foods-wrapper{
			flex: 1;
		}
	}
</style>
