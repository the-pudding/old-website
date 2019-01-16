live-homepage:
	aws s3 sync dist/homepage/ s3://pudding.cool/homepage
	aws s3 cp dist/index.html s3://pudding.cool/index.html
	aws s3 cp dist/feed/index.xml s3://pudding.cool/feed/index.xml

live-footer:
	aws s3 cp dist/footer/pudding-footer.js s3://pudding.cool/assets/scripts/pudding-footer.js

live-about: 
	aws s3 sync dist/about/ s3://pudding.cool/about

live-author: 
	aws s3 sync dist/author/ s3://pudding.cool/author

live-common:
	aws s3 sync dist/common/ s3://pudding.cool/common

live-cloudfront: 
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths  '/' '/index.html' '/homepage*' '/feed*' '/common*' '/about*' '/author*' '/assets/scripts/pudding-footer.js'	

live: live-homepage live-footer live-about live-author live-common live-cloudfront
	
server:
	browser-sync start --ss ./src --files src/**/* --index index.html --no-notify

github:
	rm -rf docs
	cp -r dist/ docs
	git add -A
	git commit -m "update dev version"
	git push