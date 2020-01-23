<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
class PostController extends Controller
{

    public function get(){
        return response()->json(Post::get());
    }
    public function delete($id){
        return response()->json(Post::destroy($id));

    }
    public function put(Request $request,$id){
        $post =  Post::find($id);
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->save();
        return response()->json($post);
    }
    public function post(Request $request){
        $post = new Post();
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->save();
        return response()->json($post);
    }
}
