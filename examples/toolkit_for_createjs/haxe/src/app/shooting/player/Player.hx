package shooting.player;
import com.dango_itimi.utils.RectangleUtil;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import createjs.easeljs.MovieClip;
import createjs.easeljs.Container;
import com.dango_itimi.toolkit_for_createjs.Instance;
class Player {

	private var view:MovieClip;
	private var nominalBounds:RectangleUtil;

    public function new() {

		view = Instance.createWithSamePackageInstance("View", this);
		view.x = 52;
		view.y = 195;

		nominalBounds = ContainerUtil.getNominalBounds(view);
		//trace(nominalBounds);
    }
	public function addChildToLayer(layer:Container){

		layer.addChild(view);
	}
	public function run(){

		view.x += 1;
	}
}
