import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Explore from "./explore/Explore";
import CollectionList from "./collection/CollectionList";
import Wishlist from "./wishlist/Wishlist";
import Queue from "./queue/Queue";
import { BookContext } from "../providers/BookProvider";
import Stats from "./stats/Stats";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);
  const { getBooks } = useContext(BookContext);

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

        <Route path="/stats">
          <Stats />
        </Route>

      </Switch>
    </main>
  );
}
