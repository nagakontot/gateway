pm2 start gateway2.js index.js --watch --env production -i max
pm2 monit


//how to update my repository in github	
//http://archive.railsforum.com/viewtopic.php?id=48601
	
//(1) commit your changes locally:
			$ git add .
			$ git commit -m "made some changes"
	
//(2) then push them to github. In the code below, the first line is only needed the first time you push to github.
			//$ git remote add origin git@github.com:yourusername/yourreponame.git
			$ git remote add origin https://github.com/nagakontot/gateway.git
			#########################
			# if u got error: fatal: remote origin already exists.
			# git reset --soft HEAD~1
			# git commit -m "First commit"
			# git remote set-url origin https://github.com/nagakontot/gateway.git
			
			$ git push origin master