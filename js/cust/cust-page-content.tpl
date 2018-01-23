{{#each this}}
	<li>
		<a href="pages/cust/cust-detail.html?custSeqid={{custSeqid}}" class="item-link item-content">
			<!--<div class="item-media">
				<div class="chip-media {{js "this.ifArchive == 'T' ? 'bg-light-blue' : 'bg-light-gray'"}}">
					<i class="f7-icons" style="font-size: 20px">ticket</i>
				</div>
			</div>-->
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{custName}}</div>
					<!--<div class="item-after">$15</div>-->
				</div>
				<div class="item-subtitle">
					{{custAddr}}
				</div>
				<div class="item-text">
					<div>
						<div class="chip {{js "this.ifArchive == 'T' ? 'chip-blue' : 'chip-red'"}}">
    						<div class="chip-label">{{js "this.ifArchive == 'T' ? '已建档' : '未建档'"}}</div>
						</div>
						<div class="chip {{js "this.longitude && this.latitude ? 'chip-blue' : 'chip-red'"}}">
    						<div class="chip-label">{{js "this.longitude && this.latitude ? '已定位' : '未定位'"}}</div>
						</div>
						<div class="chip {{js "this.images && this.images.length > 0 ? 'chip-blue' : 'chip-red'"}}">
    						<div class="chip-label">{{js "this.images && this.images.length > 0 ? '有门头照' : '无门头照'"}}</div>
						</div>
						<div class="chip {{js "this.contacts && this.contacts.length > 0 ? 'chip-blue' : 'chip-red'"}}">
    						<div class="chip-label">{{js "this.contacts && this.contacts.length > 0 ? '有联系人' : '无联系人'"}}</div>
						</div>
					</div>
					<div>集团编码：{{custCode}}</div>
					<div>集团行业：{{custIndustry}}</div>
					<div>集团归属：{{custBelong}}</div>
				</div>
			</div>
		</a>
	</li>
{{/each}}