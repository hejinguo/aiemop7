{{#each this.list}}
	<li>
		<a class="item-link item-content">
			<div class="item-media">
				<img src="{{js 'this.photoAddr ? @root.emopPro+\"base/h5/getIcon?iconName=\"+this.photoAddr : \"images/temp/timg-none.jpg\"'}}" style="width:60px;"/>
			</div>
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{staffName}}</div>
					<div class="item-after">{{phoneNo}}</div>
				</div>
				<div class="item-subtitle">
					{{staffCode}}
				</div>
				<div class="item-text">
					<div>用户归属：{{organize.orgName}}</div>
					<div>登陆时间：{{js "this.lastLoginTime ? new Date(this.lastLoginTime).toLocaleString() : '-'"}}</div>
				</div>
			</div>
		</a>
	</li>
{{/each}}