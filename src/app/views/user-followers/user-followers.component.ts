import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LiveMeService } from '../../services/live-me.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models';
import { ElectronService } from '../../services/electron.service';

@Component({
    selector: 'lmt-user-followers',
    templateUrl: './user-followers.component.html',
    styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
    followers: User[];
    filter: string;
    error: string;

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private liveme: LiveMeService,
        public electron: ElectronService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];

            this.liveme.getFollowing(id).then((followers) => {
                this.followers = followers;

                if (this.followers.length == 0) {
                    this.error = 'This user is not following anyone';
                }
            })
            .catch(err => {
                this.error = 'Unable to retrieve who the user is following at this time';
            })
        });

        this.route.queryParams.subscribe(params => {
            this.title.setTitle(`${params['name']} is following - Live.me Toolkit`);
        });
    }
}
