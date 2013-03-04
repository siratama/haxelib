#TFCLib

TFCLib は、Toolkit For CreateJS のパブリッシュデータを スクリプトから利用しやすくするためのライブラリです。 

 Haxe 用ライブラリの他、javascript から直接利用可能なライブラリファイルも用意しています。 よって、Haxe 以外の javascript 変換言語からも利用が可能です。

##MENU

* [特徴](#a1)
* [利用例 概略](#a2)
* [利用手順 javascript 編](#a3)
* [利用手順 Haxe 編](#a4)
* [TIPS](#a5)
* [TFCLib を用いて作成したサンプルシューティングゲーム](#a6)
* [注意事項](#a7)

##特徴<a name="a1"></a>

TFCLib を用いることにより以下の改善が行われます。

* パブリッシュデータ読み込みの自動化
* ogg 形式のサウンドファイル手動配置に対応
* サウンドファイル手動配置ディレクトリを任意に設定可能
* タイムライン上に配置したサウンド含む サウンドファイルの再生における SoundInstance の再利用化
* fla ファイル分割化対応

##利用例 概略<a name="a2"></a>

TFCLib は簡単なスクリプト記述で利用が可能です。 例えば Haxe からは以下のような記述で Toolkit for CreateJS からパブリッシュされた素材の読み込みが完了します。

    private function initialize(){
    	Ticker.setFPS(24);
    	Ticker.addEventListener("tick", run);
    	initializeToLoadTFC();
    }
    private function run(){
    	mainFunction();
    }
    private function initializeToLoadTFC(){
    	tfcLoader = new TFCLoader("tfc", "tfc_sounds", true);
    	tfcLoader.addMaterialDirectory("view");
    	mainFunction = loadTFC;
    }
    private function loadTFC(){
    	tfcLoader.run();
    	if(tfcLoader.isFinished()){
     		//読み込み完了
    	}
    }

TFCLoader クラスコンストラクタ引数に Toolkit for CreateJS のパブリッシュ先ディレクトリ等 指定した後、 TFCLoader.run メソッドを定期的に呼び出します。 TFCLoader.isFinished メソッドが true を返せば読み込み処理は完了です。

[▲ TOPへ](#)

##利用手順 javascript 編<a name="a3"></a>

TFCLib の本体となる javascript ファイルは build/toolkit\_for\_createjs/tfclib.js に配置しています。このファイルをコピーしてご利用ください。 

利用例ファイル一式は examples/toolkit\_for\_createjs/js/ ディレクトリに配置しています。 以下、この利用例ファイル一式を元に利用手順を記述します。

###fla ファイル作成

素材をひとまとめにした fla/view.fla を作成します。 view.fla 内の各素材データには スクリプトから制御できるよう名前付け(リンケージ設定)を行います。 

fla/view.fla 内では以下のリンケージ設定を行なっています。

* shooting.player.View --- シューティングゲームの機体用クラス 
* shooting.se.Bgm --- バックグラウンドミュージック用クラス 
* shooting.se.Shot --- 弾発射音用クラス 

shooting.se.Shot は shooting.player.View のタイムライン上に配置しており、 shooting.player.View を再生する事で、発射音が自動的に再生されるようにしています。 

shooting.se.Bgm はスクリプトから任意のタイミングで再生する用のサウンドファイルです。

###Toolkit for CreateJS によるパブリッシュ

Flash CS6 の Toolkit for CreateJS ウインドウからパブリッシュを行います。 

Toolkit for CreateJS 1.1 ではパブリッシュ先の相対パス指定ができないため、 サンプルの fla/view.fla のパブリッシュ先ディレクトリは TFCLib 制作者の制作環境のものとなってしまっています。 fla/view.fla を利用する場合、 パブリッシュ先は deploy/tfc/view/ ディレクトリとなるようにしてください。 

tfc というディレクトリ名は任意に変更可能です。 view というディレクトリ名は fla ファイルと同じ名前にする必要があるため、変更不可です。

###サウンドファイルの手動配置

Toolkit for CreateJS 1.1 から出力されるサウンドファイルは mp3 のみとなります。 あらゆるブラウザに対応するためには、mp3 形式の他 ogg 形式のサウンドファイルが必要です。 また、Toolkit for CreateJS 1.1 から出力される mp3 ファイルは 音量がとても大きくなってしまう場合があります。 

これら問題を避けるために、別途サウンド編集ソフトで mp3 と ogg ファイルを作成し、 手動で任意のディレクトリに配置します。 

Toolkit for CreateJS から出力されたサウンドファイルは deploy/tfc/view/sounds/ ディレクトリ内の 「shootingseBgm.mp3」「shootingseShot.mp3」という名前で配置されています。 同じ名称の mp3 と ogg ファイルを作成後、 deploy/tfc\_sounds/view/sounds/ ディレクトリに配置してください。 tfc\_sounds というディレクトリ名は任意に変更可能です。 

サウンドファイル配置ディレクトリは以下のようになります。

    ├ tfc/
    │　└ view/
    │　　　└ sounds/
    │　　　　　├ shootingseBgm.mp3
    │　　　　　└ shootingseShot.mp3
    └ tfc_sounds/
    　　└ view/
    　　　　└ sounds/
    　　　　　　├ shootingseBgm.mp3
    　　　　　　├ shootingseBgm.ogg
    　　　　　　├ shootingseShot.mp3
    　　　　　　└ shootingseShot.ogg

tfc/ と同じディレクトリ構成にした後 スクリプト側から指定する事により tfc_sounds/ 内のサウンドファイルが利用されるようになります。

###表示用 index.html 作成

deploy/index.html を作成します。この deploy/index.html 内の canvas に Toolkit for CreateJS でパブリッシュした素材データの描画を行います。 

deploy/index.html head タグ内には CreateJS を利用するための script タグ記述を行います。

    <script src="http://code.createjs.com/easeljs-0.6.0.min.js"></script>
    <script src="http://code.createjs.com/easeljs-0.6.0.min.js"></script>
    <script src="http://code.createjs.com/tweenjs-0.4.0.min.js"></script>
    <script src="http://code.createjs.com/movieclip-0.6.0.min.js"></script>
    <script src="http://code.createjs.com/preloadjs-0.3.0.min.js"></script>
    <script src="http://code.createjs.com/soundjs-0.4.0.min.js"></script>

Toolkit for CreateJS でパブリッシュされた js ファイル deploy/tfc/view/view.js と、 TFCLib 本体用ファイル deploy/js/tfclib.js を利用する旨の script タグの記述も行います。


    <script src="tfc/view/view.js"></script>
    <script src="js/tfclib.js"></script>

更に 上記 js ファイル全てを利用し制御するための deploy/js/Index.js ファイルを新規で作成し、 以下のようにして呼び出します。

    <script src="js/Index.js"></script>
    <script>
        window.onload = function(){
            new Index();
        };
    </script>

###Toolkit for CreateJS パブリッシュデータ読み込み

deploy/js/Index.js 内の Toolkit for CreateJS パブリッシュデータ読み込み設定箇所は 以下のようになります。

    this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "tfc_sounds", true);
    this.tfcLoader.addMaterialDirectory("view");

TFCLoader クラスのコンストラクタ 引数の説明は以下となります。 

* 第一引数 --- Toolkit for CreateJS パブリッシュ先 ディレクトリ名
* 第ニ引数 --- 手動サウンド配置ディレクトリ名
* 第三引数 --- ogg 形式のサウンドファイルを利用するかどうか

TFCLoader.addMaterialDirectory メソッドには パブリッシュ元の fla ファイル名を指定します。 

サウンドファイルを利用しない場合や、 Tookit for CreateJS で出力されたサウンドファイルをそのまま利用する場合、 以下のように第二・第三引数を省略します。

    this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc");

Tookit for CreateJS で出力されたサウンドファイルをそのまま利用し、Tookit for CreateJS で出力されたサウンドファイル と同じディレクトリに ogg ファイル配置する場合、以下の様な記述を行います。

    this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "", true);

読み込み設定完了後、TFCLoader.run メソッドを定期的に呼び出し、TFCLoader.isFinished メソッドが true を返すと読み込みが完了した事になります。


###タイムライン(フレーム)に配置したサウンドファイルの再生有効化

パブリッシュデータ読み込み完了後、以下の記述を行うことで、タイムラインに配置したサウンドファイルの再生の有効化が行われます。サンプルファイルでは、shooting.se.Shot の再生が有効化されます。

    com.dango_itimi.toolkit_for_createjs.SoundPlayer.initialize();

有効化されるだけであり、まだこの段階で音が再生されるわけではありません。 

###MovieClip 生成とタイムラインサウンドの再生

deploy/js/Index.js 内 Player クラスにて、 fla ファイルで設定した shooting.player.View クラスに対する MovieClip (lib.shootingplayerView) の生成を行なっています。 この MovieClip を再生すると、 タイムラインに配置したサウンドファイル shooting.se.Shot の再生も行われます。 

###任意のタイミングでのサウンド再生

deploy/js/Index.js 内 SoundMixer クラスにて、 fla ファイルで設定した shooting.se.Bgm の再生を行なっています。 

SoundPlayer.getSoundEffectMap().play メソッド経由でサウンドを再生する事により、 SoundJS の Sound.play メソッドから生成される SoundInstance の 再利用化が自動的になされる仕組みになっています。 

###サウンド追加

Bgm の他、例えば fla/view.fla ファイル内に Test というサウンドファイルを追加した場合、 SoundMixer クラス内に以下の playForTest メソッドを追加します。 

    SoundMixer.playForTest = function(){
        SoundMixer.play("Test");
    };

以上で、javascript による利用手順の説明は完了です。

[▲ TOPへ](#)

##利用手順 Haxe 編<a name="a4"></a>

javascript 編と流れや内容はほぼ同じなので、異なる点のみ記述します。 

利用例ファイル一式は examples/toolkit_for_createjs/haxe/ ディレクトリに配置しています。 

TFCLib Haxe 用ライブラリファイルと、その他 ライブラリファイルは src/ ディレクトリにあります。 「src/core/」「src/createjs/」「src/toolkit_for_createjs/」各ディレクトリに クラスパスを通してご利用ください。 

###CreateJS-Haxe のインストール

以下の URL の CreateJS-Haxe を事前に PC にインストールしておく必要があります。 

[http://lib.haxe.org/p/createjs](http://lib.haxe.org/p/createjs)

Windowsの場合、コマンドプロンプトで「haxelib install createjs」と入力する事でインストールが可能です。 

###fla ファイル作成

javascript 編と同じにつき略

###Toolkit for CreateJS によるパブリッシュ

javascript 編と同じにつき略

###サウンドファイルの手動配置

javascript 編と同じにつき略

###表示用 index.html 作成

内容は javascript 編とほぼ同じです。 

Haxe 編では js/tfclib.js の利用は行わず、js/Index.js の作成も行いません。 代わりに examples/toolkit_for_createjs/haxe/src/ ディレクトリ内に 全ての処理を行う Main.hx クラスを作成し、 Main.hx クラスのコンパイルにより生成される js/App.js ファイルを呼び出す記述を行います。 

    <script src="js/App.js"></script>

###Toolkit for CreateJS パブリッシュデータ読み込み

examples/toolkit_for_createjs/haxe/src/Main.hx 内に、全ての制御を行う処理を記述しています。 書き方が異なるだけで内容は javascript 編の Index.js の内容とほぼ同じです。 

###タイムライン(フレーム)に配置したサウンドファイルの再生有効化

javascript 編と同じにつき略

###MovieClip 生成とタイムラインサウンドの再生

Player クラスを shooting.player パッケージに配置し、 Instance.createWithSamePackageInstance メソッドを利用する事で、 fla ファイルで設定した同一パッケージ shooting.player.View の生成を行なっています。

###任意のタイミングでのサウンド再生

SoundMixer クラスを shooting.se パッケージに配置し、 ClassUtil.getPackageNamesWithClass メソッドを利用する事で、 サウンド配置パッケージの指定を行なっています。 

###サウンド追加

javascript 編と同じにつき略

以上で、Haxe による利用手順の説明は完了です。

[▲ TOPへ](#)


##TIPS<a name="a5"></a>

###シンボルの初期表示サイズ・位置情報取得: ContainerUtil.getNominalBounds メソッド

EaselJS の Container クラスには width や height プロパティは用意されていません。 しかし Toolkit for CreateJS からパブリッシュされた javascript 内 MovieClip には Rectangle 型の nominalBounds プロパティというものが付与され、 そこから width や height 値を取得する事が可能です。 

サンプルの Player クラス内コンストラクタでは nominalBounds を取得変換(com.dango_itimi.utils.RectangleUtil 型に変換) し フィールド値として設定しています。 

###Flash CS のステージ上に配置したインスタンスプロパティの取得: ContainerUtil.getProperty メソッド

Flash CS のステージ上に配置したインスタンスプロパティをスクリプトから取得する場合、 com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil クラスの getProperty メソッドを利用します。 

例えば、 Flash CS 上で設定した shooting.player.View ムービークリップ内 test インスタンスプロパティを取得するには javascript の場合以下のように記述します。 

    var view = new lib.shootingplayerView();
    var testProperty = com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil.getProperty(view, "test");

詳細は以下の URL をご覧ください。 

[http://www.dango-itimi.com/blog/archives/2013/001164.html](http://www.dango-itimi.com/blog/archives/2013/001164.html)

###fla ファイル分割

プロジェクトの規模が大きくなると fla ファイルを複数に分割して作成する事があります。 サンプルの view.fla 以外に test.fla というものを作成した場合、 パブリッシュ先ディレクトリは以下の様な構成にします。 

    ├ tfc/
    │　├ view/
    │　└ test/
    │　
    └ tfc_sounds/
    　　├ view/
    　　└ test/

スクリプト側は TFCLoader.addMaterialDirectory メソッドに test ディレクトリ指定を追加します。 

    this.tfcLoader = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "tfc_sounds", true);
    this.tfcLoader.addMaterialDirectory("view");
    this.tfcLoader.addMaterialDirectory("test");

ただし fla ファイルを分割すると、Javascript 名前空間の取り扱いが やや面倒になる難点が出てきますのでご注意ください。

###分割読み込み

上記は view.fla と test.fla のパブリッシュ内容を一括して読み込みますが、 分割してそれぞれ別々に読み込みたい場合は以下の様に記述します。 

    this.tfcLoaderForView = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "tfc_sounds", true);
    this.tfcLoaderForView.addMaterialDirectory("view");
    
    this.tfcLoaderForTest = new com.dango_itimi.toolkit_for_createjs.TFCLoader("tfc", "tfc_sounds", true);
    this.tfcLoaderForTest.addMaterialDirectory("test");

TFCLoader インスタンスを別々に生成し、 それぞれ任意のタイミングで TFCLoader.run メソッドを実行すれば良しとなります。

[▲ TOPへ](#)

##TFCLib を用いて作成したサンプルシューティングゲーム<a name="a6"></a>

[http://www.dango-itimi.com/html5/1/](http://www.dango-itimi.com/html5/1/)

##注意事項<a name="a7"></a>

TFCLib は MIT ライセンスです。 

TFCLib はそれぞれ以下のバージョンに対応しています。

* Toolkit for CreateJS 1.1
* EaselJS 0.6.0
* TweenJS 0.4.0
* SoundJS 0.4.0
* PreloadJS 0.3.0
* Haxe 2.10

TFCLib は、 Toolkit for CreateJS からパブリッシュされる 雛形 html の読み込みと解析を行う事で、 パブリッシュデータ自動読み込み処理を実現しています。 

ファイル読み込みの制限上、ローカル環境上では TFCLib は動作しません。 自身の PC に Apache を導入する、 あるいはインターネット上にアップロードする等して動作確認をする必要があります。

[▲ TOPへ](#)

