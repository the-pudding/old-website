PHONY: live-home live-about live-privacy live-faq live-author live-topics live-archives live-footer live-common live-cloudfront live server github

live-home:
	aws s3 cp dist/index.html s3://pudding.cool/index.html
	aws s3 cp dist/feed/index.xml s3://pudding.cool/feed/index.xml

live-about: 
	aws s3 sync dist/about/ s3://pudding.cool/about

live-privacy: 
	aws s3 sync dist/privacy/ s3://pudding.cool/privacy

live-faq: 
	aws s3 sync dist/faq/ s3://pudding.cool/faq

live-author: 
	aws s3 sync dist/author/ s3://pudding.cool/author

live-topics:
	aws s3 sync dist/topics/ s3://pudding.cool/topics

live-archives:
	aws s3 sync dist/archives/ s3://pudding.cool/archives

live-backlog:
	aws s3 sync dist/backlog/ s3://pudding.cool/backlog

live-footer:
	aws s3 cp dist/footer/stories.json s3://pudding.cool/assets/data/stories.json
	# aws s3 cp dist/footer/pudding-footer.js s3://pudding.cool/assets/scripts/pudding-footer.js
	# aws s3 cp dist/footer/pudding-footer.v2.js s3://pudding.cool/assets/scripts/pudding-footer.v2.js

live-common:
	aws s3 sync dist/common/ s3://pudding.cool/common

live-cloudfront: 
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths  '/' '/index.html' '/feed*' '/common*' '/about*' '/privacy*' '/faq*' '/author*' '/topics*' '/archives*' '/backlog*' '/assets/scripts/pudding-footer.js' '/assets/scripts/pudding-footer.v2.js' '/assets/data*'

live: live-home live-about live-privacy live-faq live-author live-topics live-archives live-backlog live-footer live-common live-cloudfront
	
server:
	browser-sync start --ss ./dev --files dev/**/* --index index.html --no-notify

github:
	rm -rf docs
	cp -r dist/ docs
	git add -A
	git commit -m "update dev version"
	git push