{{#each this}}
	<li>
		<div class="item-content">
			<div class="item-inner">
				<div class="item-input">
					<input type="text" name="contactName" placeholder="联系人姓名" value="{{contactName}}">
				</div>
				<div class="item-input">
					<input type="text" name="contactPhone" placeholder="电话" value="{{contactPhone}}">
				</div>
				<div style="width:100px;" class="aui-hidden">
					<a class="button button-fill bg-button-delete" 
						style="line-height:19px;height:auto;" 
						onclick="javascript:Dom7(this).parent().parent().parent().parent().remove();">
						删除
					</a>
				</div>
			</div>
		</div>
	</li>
{{/each}}