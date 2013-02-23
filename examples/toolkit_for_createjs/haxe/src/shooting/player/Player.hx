package shooting.player;
import createjs.easeljs.MovieClip;
import createjs.easeljs.Container;
import com.dango_itimi.toolkit_for_createjs.Instance;
class Player {

	private var mainFunction:Void->Void;
	private var view:MovieClip;

    public function new() {

		view = Instance.createWithSamePackageInstance("View", this);
		view.x = 52;
		view.y = 195;
		mainFunction = run;
    }
	public function addChildToLayer(layer:Container){

		layer.addChild(view);
	}
	public function run(){

		view.x += 1;
	}
}
