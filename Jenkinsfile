pipeline {
    agent none
    stages {
        stage("build") {
            agent {
                docker { image 'klakegg/hugo:0.94.2-ext-debian-ci' }
            }

            steps {
				sh 'git submodule update --init --recursive'
                sh 'hugo --verbose'
                stash includes: '**/public/', name: 'app'
            }
        }
		
        stage("deploy") {
            when { branch 'master' }
            agent { label 'production' }
            steps {
                unstash 'app'
                sh "./scripts/deploy-public.sh"
            }
        }
    }
}
