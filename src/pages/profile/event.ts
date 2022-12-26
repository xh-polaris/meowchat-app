export function CopyToClipboard(res :string){
	  uni.setClipboardData({
	                    data: res,
	                    success: () => {
	                        uni.showToast({
	                            title: '复制成功'
	                        })
	                    }
	                })
}

