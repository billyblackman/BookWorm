import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Explore from "./explore/Explore";
import CollectionList from "./collection/CollectionList";
import Wishlist from "./wishlist/Wishlist";
import Queue from "./queue/Queue";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/explore">
          <Explore />
        </Route>

        <Route path="/collection">
          <CollectionList />
        </Route>

        <Route path="/wishlist">
          <Wishlist />
        </Route>

        <Route path="/queue">
          <Queue />
        </Route>

      </Switch>
    </main>
  );
}
