import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

import {
    follow, getUsers,
    SetCurrentPageAC,
    toggleIsFetchingAC,
    toggleIsFollowingProgressAC,
    unFollow,
    UserType,
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

type UsersTypeProps = {
    users: UserType[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching: (totalCount: boolean) => void
    isFetching: boolean
    followingInProgress: Array<number>
    toggleIsFollowingProgress: (isLoading: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
 }

class UsersContainer extends React.Component<UsersTypeProps> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page: number) => {
        if (page !== this.props.currentPage) {
            this.props.setCurrentPage(page)
            this.props.toggleIsFetching(true)
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }

    }

    render() {

        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users users={this.props.users}
                         currentPage={this.props.currentPage}
                         totalUsersCount={this.props.totalUsersCount}
                         onPageChanged={this.onPageChanged}
                         pageSize={this.props.pageSize}
                         follow={this.props.follow}
                         unFollow={this.props.unFollow}
                         followingInProgress={this.props.followingInProgress}
                         toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}

                />
            }
        </>
    }
}


type mapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage: SetCurrentPageAC,
    toggleIsFetching: toggleIsFetchingAC,
    toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    getUsers
})(UsersContainer)